import type {
  Calle,
  DireccionType,
  DireccionCalleAltura,
  DireccionCalleYCalle,
  Coordinates,
} from "../types/direction.types";
import axios, { type AxiosRequestConfig } from "axios";

// API endpoints
const USIG_WEBSERVICE_URL = "https://servicios.usig.buenosaires.gob.ar";
const CATASTRO_WEBSERVICE_URL = "https://epok.buenosaires.gob.ar/catastro";

// Response types
interface NormalizadorResponse {
  direccionesNormalizadas?: Array<{
    altura_par: string | undefined;
    altura_impar: string | undefined;
    calle_alturas: { inicio: number; fin: number }[] | undefined;
    direccion?: string;
    tipo?: string;
    nombre?: string;
    altura?: string;
    cod_calle?: string;
    cod_partido?: string;
    partido?: string;
    cod_localidad?: string;
    nombre_partido?: string;
    nombre_localidad?: string;
    localidad?: string;
    comuna?: string;
    barrio?: string;
    coordenadas?: {
      x: string;
      y: string;
      srid: number;
    };
  }>;
  calles?: Array<{
    nombre: string;
    tipo?: string;
    cod_calle: string;
    altura?: {
      inicial: number;
      final: number;
    };
    partido?: string;
    localidad?: string;
  }>;
  error?: string;
}

interface CatastroResponse {
  smp?: string;
  error?: string;
}

interface ReverseGeocodingResponse {
  direccion?: string;
  tipo?: string;
  nombre?: string;
  altura?: string;
  cod_calle?: string;
  cod_partido?: string;
  partido?: string;
  cod_localidad?: string;
  localidad?: string;
  nombre_barrio?: string;
  nombre_comuna?: string;
  nombre_partido?: string;
  calle_alturas?: {
    inicio: number;
    fin: number;
  }[];
  altura_par?: string;
  altura_impar?: string;
  nombre_localidad?: string;
  barrio?: string;
  coordenadas?: {
    x: string;
    y: string;
    srid: number;
  };
  error?: string;
}

export class ApiNormalizer {
  private debug: boolean;
  private maxSuggestions: number;
  private lastRequest: AbortController | null;
  private serverTimeout: number;

  constructor(
    options: {
      debug?: boolean;
      maxSuggestions?: number;
      serverTimeout?: number;
    } = {}
  ) {
    this.debug = options.debug || false;
    this.maxSuggestions = options.maxSuggestions || 10;
    this.serverTimeout = options.serverTimeout || 5000;
    this.lastRequest = null;
  }

  /**
   * Abort any ongoing request
   */
  abort(): void {
    if (this.lastRequest) {
      this.lastRequest.abort();
      this.lastRequest = null;
      if (this.debug) console.debug("Request aborted");
    }
  }

  /**
   * Normalizes an address string and returns matching addresses
   */
  async normalizar(
    str: string,
    maxOptions: number = this.maxSuggestions
  ): Promise<Array<DireccionType | Calle>> {
    if (this.debug) {
      console.debug(`ApiNormalizer.normalizar('${str}', ${maxOptions})`);
    }

    // Abort previous request if exists
    this.abort();

    // Create new AbortController for this request
    this.lastRequest = new AbortController();

    try {
      let results: Array<DireccionType | Calle> = [];

      // 1. First search for addresses
      const addresses = await this.searchAddresses(str, maxOptions);
      results = [...results, ...addresses];

      // 2. Check if input is coordinates and search if it is
      const coordsMatch = this.parseCoordinates(str);
      if (coordsMatch) {
        const coordResults = await this.reverseGeocode(
          coordsMatch.x,
          coordsMatch.y
        );
        results = [...results, ...coordResults];
      }

      return results.slice(0, maxOptions);
    } catch (error) {
      if (axios.isCancel(error)) {
        if (this.debug) console.debug("Request was cancelled");
      } else {
        console.error("Error normalizing address:", error);
      }
      return [];
    } finally {
      this.lastRequest = null;
    }
  }

  /**
   * Search for addresses using the USIG API
   */
  private async searchAddresses(
    str: string,
    maxOptions: number
  ): Promise<Array<DireccionType | Calle>> {
    try {
      const url = `${USIG_WEBSERVICE_URL}/normalizar/?direccion=${encodeURIComponent(
        str
      )}&geocodificar=true&max=${maxOptions}`;

      const config: AxiosRequestConfig = {
        headers: {
          Accept: "application/json",
        },
        signal: this.lastRequest?.signal,
        timeout: this.serverTimeout,
      };

      const response = await axios.get<NormalizadorResponse>(url, config);

      if (response.data.error) {
        if (this.debug) console.error("API error:", response.data.error);
        return [];
      }

      // Process direccionesNormalizadas (addresses)
      if (
        response.data.direccionesNormalizadas &&
        response.data.direccionesNormalizadas.length > 0
      ) {
        const direccionesCABA = response.data.direccionesNormalizadas.filter(
          (dir) => {
            const cod = dir.cod_partido?.toLowerCase();
            const nombrePartido = dir.nombre_partido?.toLowerCase();
            const nombreLocalidad = dir.nombre_localidad?.toLowerCase();

            return (
              cod === "caba" ||
              nombrePartido === "caba" ||
              nombreLocalidad === "caba"
            );
          }
        );
        const direccionesEnriquecidas = await Promise.all(
          direccionesCABA.map(async (dir) => {
            const coordenadas = await this.obtenerCoordenadas(
              dir.cod_calle ?? "",
              Number(dir.altura ?? 0),
              {
                x: Number.parseFloat(dir.coordenadas?.x ?? "0"),
                y: Number.parseFloat(dir.coordenadas?.y ?? "0"),
              }
            );
            if (coordenadas) {
              const { barrio, comuna } = await this.obtenerBarrioYComuna(
                coordenadas.y,
                coordenadas.x
              );

              return {
                ...dir,
                altura_par: coordenadas.altura_par,
                altura_impar: coordenadas.altura_impar,
                calle_alturas: coordenadas.calle_alturas,
                coordenadas: {
                  x: coordenadas.x.toString(),
                  y: coordenadas.y.toString(),
                  srid: 4326,
                },
                barrio,
                comuna,
              };
            } else {
              return dir; // Devolvés la dirección sin coordenadas ni barrio/comuna
            }
          })
        );
        return this.processDireccionesNormalizadas(direccionesEnriquecidas);
      }

      // Process calles (streets)
      if (response.data.calles && response.data.calles.length > 0) {
        return this.processCalles(response.data.calles);
      }

      return [];
    } catch (error) {
      if (axios.isCancel(error)) {
        if (this.debug) console.debug("Address search request was cancelled");
      } else {
        console.error("Error searching addresses:", error);
      }
      return [];
    }
  }

  private async obtenerBarrioYComuna(
    lat: number,
    lon: number
  ): Promise<{ barrio?: string; comuna?: string }> {
    try {
      const url = `https://ws.usig.buenosaires.gob.ar/datos_utiles/?x=${lon}&y=${lat}`;
      const response = await axios.get(url);
      const capas = response.data;
      const barrio = capas?.barrio;
      const comuna = capas?.comuna;

      return { barrio, comuna };
    } catch (error) {
      console.error("Error al obtener barrio y comuna:", error);
      return {};
    }
  }

  private async obtenerCoordenadas(
    calle: string,
    numero: number,
    coords?: {
      x: number;
      y: number;
    }
  ): Promise<Coordinates | null> {
    try {
      if (coords) {
        const getAltura = `https://ws.usig.buenosaires.gob.ar/geocoder/2.2/reversegeocoding?x=${coords.x}&y=${coords.y}`;
        const conversionUrl = `https://ws.usig.buenosaires.gob.ar/rest/convertir_coordenadas/?x=${coords.x}&y=${coords.y}&output=lonlat`;

        const conversionResponse = await axios.get(conversionUrl);
        const alturaResponse = await axios.get(getAltura);
        const alturaJsonString = alturaResponse.data.replace(/^\(|\)$/g, "");

        const { calle_alturas, altura_impar, altura_par } =
          JSON.parse(alturaJsonString);

        const { x: lon, y: lat } = conversionResponse.data.resultado;

        return { y: lat, x: lon, altura_par, altura_impar, calle_alturas };
      }
      const geocodingUrl = `https://ws.usig.buenosaires.gob.ar/geocoder/2.2/geocoding?cod_calle=${encodeURIComponent(
        calle
      )}&altura=${numero}`;

      const geocodingResponse = await axios.get<string>(geocodingUrl);
      const text = geocodingResponse.data;
      // Elimina los paréntesis del string
      const jsonString = text.replace(/^\(|\)$/g, "");
      const data = JSON.parse(jsonString);

      const { x, y } = data;
      const getAltura = `https://ws.usig.buenosaires.gob.ar/geocoder/2.2/reversegeocoding?x=${x}&y=${y}`;
      const conversionUrl = `https://ws.usig.buenosaires.gob.ar/rest/convertir_coordenadas/?x=${x}&y=${y}&output=lonlat`;

      const conversionResponse = await axios.get(conversionUrl);
      const alturaResponse = await axios.get(getAltura);
      const alturaJsonString = alturaResponse.data.replace(/^\(|\)$/g, "");

      const { calle_alturas, altura_impar, altura_par } =
        JSON.parse(alturaJsonString);

      const { x: lon, y: lat } = conversionResponse.data.resultado;

      return { y: lat, x: lon, altura_par, altura_impar, calle_alturas };
    } catch (error) {
      console.error("Error al obtener coordenadas:", error);
      return null;
    }
  }

  /**
   * Parse coordinates from input string
   * Supports formats like "lat,lng", "x,y", "-34.603722,-58.381592"
   */
  private parseCoordinates(str: string): Coordinates | null {
    // Remove any spaces
    const cleanStr = str.trim().replace(/\s+/g, "");

    // Match common coordinate formats
    const patterns = [
      // Lat,Lng format (e.g., -34.603722,-58.381592)
      /^(-?\d+\.?\d*),(-?\d+\.?\d*)$/,
      // X,Y format with optional text (e.g., "x: 123.45, y: 678.90")
      /x:?(-?\d+\.?\d*)[,\s]+y:?(-?\d+\.?\d*)/i,
      // Y,X format with optional text (e.g., "y: 678.90, x: 123.45")
      /y:?(-?\d+\.?\d*)[,\s]+x:?(-?\d+\.?\d*)/i,
    ];

    for (const pattern of patterns) {
      const match = cleanStr.match(pattern);
      if (match) {
        if (pattern === patterns[0]) {
          // Lat,Lng format
          return {
            y: Number.parseFloat(match[1]), // Latitude is Y
            x: Number.parseFloat(match[2]), // Longitude is X
          };
        } else if (pattern === patterns[1]) {
          // X,Y format
          return {
            x: Number.parseFloat(match[1]),
            y: Number.parseFloat(match[2]),
          };
        } else if (pattern === patterns[2]) {
          // Y,X format
          return {
            y: Number.parseFloat(match[1]),
            x: Number.parseFloat(match[2]),
          };
        }
      }
    }

    return null;
  }

  /**
   * Reverse geocode coordinates to get an address
   */
  private async reverseGeocode(x: number, y: number): Promise<DireccionType[]> {
    if (this.debug) {
      console.debug(`ApiNormalizer.reverseGeocode(${x}, ${y})`);
    }

    // Abort previous request if exists
    this.abort();

    // Create new AbortController for this request
    this.lastRequest = new AbortController();

    try {
      const url = `${USIG_WEBSERVICE_URL}/reverseGeocoderLugares/?x=${x}&y=${y}&srid=4326`;

      const config: AxiosRequestConfig = {
        headers: {
          Accept: "application/json",
        },
        signal: this.lastRequest.signal,
        timeout: this.serverTimeout,
      };

      const response = await axios.get<ReverseGeocodingResponse>(url, config);

      if (response.data.error) {
        if (this.debug)
          console.error("Reverse geocoding API error:", response.data.error);
        return [];
      }

      if (!response.data.direccion) {
        return [];
      }

      // Create a base calle object
      const calle: Calle = {
        codigo: response.data.cod_calle || "coord",
        nombre: response.data.nombre || response.data.direccion || "Coordenada",
        descripcion: response.data.direccion || "Coordenada",
        tipo: "CALLE",
        alturas: [
          {
            inicio: 1,
            fin: 10000, // Default range
          },
        ],
      };

      // Parse altura if available
      let altura = 0;
      if (response.data.altura) {
        altura = Number.parseInt(response.data.altura, 10);
      }

      // Create a DireccionCalleAltura object
      const direccion: DireccionCalleAltura = {
        calle,
        altura: altura || 1, // Default to 1 if no number found
        tipoDireccion: "DIRECCION_CALLE_ALTURA",
        tipo: "DIRECCION",
        nombre:
          response.data.direccion ||
          `Coordenada (${x.toFixed(6)}, ${y.toFixed(6)})`,
        descripcion: `Coordenada (${x.toFixed(6)}, ${y.toFixed(6)})`,
        coordenadas: {
          x,
          y,
          srid: response.data.coordenadas?.srid || 4326,
        },
        barrio: response.data.nombre_barrio,
        altura_par: response.data.altura_par,
        altura_impar: response.data.altura_impar,
        calle_alturas: response.data.calle_alturas,
        comuna: response.data.nombre_comuna,
      };

      return [direccion];
    } catch (error) {
      if (axios.isCancel(error)) {
        if (this.debug)
          console.debug("Reverse geocoding request was cancelled");
      } else {
        console.error("Error in reverse geocoding:", error);
      }
      return [];
    } finally {
      this.lastRequest = null;
    }
  }

  /**
   * Process normalized addresses from API response
   */
  private processDireccionesNormalizadas(
    direcciones: NormalizadorResponse["direccionesNormalizadas"]
  ): Promise<DireccionType[]> {
    if (!direcciones) return Promise.resolve([]);

    const promises = direcciones.map(async (dir) => {
      // Skip invalid addresses
      if (!dir.direccion || !dir.cod_calle) return null;

      // Create a base calle object
      const calle: Calle = {
        codigo: dir.cod_calle,
        nombre: dir.nombre || dir.direccion.split(" ")[0],
        descripcion: dir.direccion,
        tipo: "CALLE",
        alturas: [
          {
            inicio: 1,
            fin: 10000, // Default range
          },
        ],
      };

      // Determine if it's a street intersection or street with number
      const isIntersection = dir.direccion.includes(" y ");
      let direccion: DireccionType;

      if (isIntersection) {
        // It's a street intersection
        const calleNames = dir.direccion.split(" y ").map((c) => c.trim());

        // We need to create a second calle object for the intersection
        // In a real app, you might want to make another API call to get details
        // For now, we'll create a mock second street
        const calleCruce: Calle = {
          codigo: `${dir.cod_calle}_cruce`,
          nombre: calleNames[1] || "Calle cruce",
          descripcion: calleNames[1] || "Calle cruce",
          tipo: "CALLE",
          alturas: [
            {
              inicio: 1,
              fin: 10000,
            },
          ],
        };

        direccion = {
          calle,
          calleCruce,
          tipoDireccion: "DIRECCION_CALLE_Y_CALLE",
          tipo: "DIRECCION",
          nombre: dir.direccion,
          descripcion: dir.direccion,
          coordenadas: dir.coordenadas
            ? {
                x: Number.parseFloat(dir.coordenadas.x),
                y: Number.parseFloat(dir.coordenadas.y),
                srid: dir.coordenadas.srid,
              }
            : undefined,
          barrio: dir.barrio,
          comuna: dir.comuna,
          altura_par: dir.altura_par,
          altura_impar: dir.altura_impar,
          calle_alturas: dir.calle_alturas,
        } as DireccionCalleYCalle;
      } else {
        // It's a street with number
        const altura = dir.altura ? Number.parseInt(dir.altura, 10) : 0;

        direccion = {
          calle,
          altura,
          tipoDireccion: "DIRECCION_CALLE_ALTURA",
          tipo: "DIRECCION",
          nombre: dir.direccion,
          descripcion: dir.direccion,
          coordenadas: dir.coordenadas
            ? {
                x: Number.parseFloat(dir.coordenadas.x),
                y: Number.parseFloat(dir.coordenadas.y),
                srid: dir.coordenadas.srid,
              }
            : undefined,
          barrio: dir.barrio,
          comuna: dir.comuna,
          altura_par: dir.altura_par,
          altura_impar: dir.altura_impar,
          calle_alturas: dir.calle_alturas,
        } as DireccionCalleAltura;

        // Get SMP if it's a street with number
        if (altura > 0) {
          try {
            const smp = await this.getSMP({
              nombre: dir.direccion,
              descripcion: dir.direccion || "",
              tipo: "DIRECCION",
              codigo: dir.cod_calle,
              altura: dir.altura,
              altura_par: dir.altura_par,
              altura_impar: dir.altura_impar,
              calle_alturas: dir.calle_alturas,
              calle: {
                codigo: dir.cod_calle,
              },
            });
            if (smp) {
              direccion.smp = smp;
            }
          } catch (error) {
            if (this.debug) console.error("Error getting SMP:", error);
          }
        }
      }

      return direccion;
    });

    return Promise.all(promises).then(
      (results) => results.filter(Boolean) as DireccionType[]
    );
  }

  /**
   * Process streets from API response
   */
  private processCalles(calles: NormalizadorResponse["calles"]): Calle[] {
    if (!calles) return [];

    return calles.map((calle) => ({
      codigo: calle.cod_calle,
      nombre: calle.nombre,
      descripcion: calle.tipo ? `${calle.tipo} ${calle.nombre}` : calle.nombre,
      tipo: "CALLE",
      alturas: [
        {
          inicio: calle.altura?.inicial || 1,
          fin: calle.altura?.final || 10000,
        },
      ],
      partido: calle.partido,
      localidad: calle.localidad,
    }));
  }

  /**
   * Get coordinates for an address
   */
  async getCoordinates(lugar: {
    nombre: string;
    descripcion: string;
  }): Promise<Coordinates | undefined> {
    try {
      // Abort previous request if exists
      this.abort();

      // Create new AbortController for this request
      this.lastRequest = new AbortController();

      const url = `${USIG_WEBSERVICE_URL}/normalizar/?direccion=${encodeURIComponent(
        lugar.nombre
      )},${encodeURIComponent(lugar.descripcion)}&geocodificar=true&srid=4326`;

      const config: AxiosRequestConfig = {
        headers: {
          Accept: "application/json",
        },
        signal: this.lastRequest.signal,
        timeout: this.serverTimeout,
      };

      const response = await axios.get<NormalizadorResponse>(url, config);

      const direccion = response.data.direccionesNormalizadas?.[0];

      if (direccion?.coordenadas) {
        const coords = direccion.coordenadas;
        return {
          x: Number.parseFloat(coords.x),
          y: Number.parseFloat(coords.y),
          srid: coords.srid,
        };
      }

      return undefined;
    } catch (error) {
      if (axios.isCancel(error)) {
        if (this.debug) console.debug("Request was aborted");
      } else {
        console.error("Error fetching coordinates:", error);
      }
      return undefined;
    } finally {
      this.lastRequest = null;
    }
  }

  /**
   * Get SMP (cadastral identifier) for an address
   */
  async getSMP(lugar: {
    nombre: string;
    descripcion: string;
    tipo: string;
    codigo?: string;
    altura?: string | number;
    altura_par?: string | number;
    altura_impar?: string | number;
    calle_alturas?: { inicio: number; fin: number }[];
    calle?: {
      codigo: string;
    };
  }): Promise<string | undefined> {
    try {
      // Abort previous request if exists
      this.abort();

      // Create new AbortController for this request
      this.lastRequest = new AbortController();

      const codigo = lugar.codigo || lugar.calle?.codigo;
      if (!codigo || !lugar.altura) {
        return undefined;
      }

      const url = `${CATASTRO_WEBSERVICE_URL}/parcela/?codigo_calle=${encodeURIComponent(
        codigo
      )}&altura=${encodeURIComponent(
        String(lugar.altura)
      )}&geocodificar=true&srid=4326`;

      const config: AxiosRequestConfig = {
        headers: {
          Accept: "application/json",
        },
        signal: this.lastRequest.signal,
        timeout: this.serverTimeout,
      };

      const response = await axios.get<CatastroResponse>(url, config);

      return response.data.smp;
    } catch (error) {
      if (axios.isCancel(error)) {
        if (this.debug) console.debug("Request was aborted");
      } else {
        console.error("Error fetching catastro data:", error);
      }
      return undefined;
    } finally {
      this.lastRequest = null;
    }
  }

  /**
   * Check if the normalizer is initialized
   */
  static inicializado(): boolean {
    return true;
  }
}
