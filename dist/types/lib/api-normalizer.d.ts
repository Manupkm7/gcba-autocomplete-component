import type { Calle, DireccionType, Coordinates } from "@/types/direction";
export declare class ApiNormalizer {
    private debug;
    private maxSuggestions;
    private lastRequest;
    private serverTimeout;
    constructor(options?: {
        debug?: boolean;
        maxSuggestions?: number;
        serverTimeout?: number;
    });
    /**
     * Abort any ongoing request
     */
    abort(): void;
    /**
     * Normalizes an address string and returns matching addresses
     */
    normalizar(str: string, maxOptions?: number): Promise<Array<DireccionType | Calle>>;
    /**
     * Search for addresses using the USIG API
     */
    private searchAddresses;
    /**
     * Parse coordinates from input string
     * Supports formats like "lat,lng", "x,y", "-34.603722,-58.381592"
     */
    private parseCoordinates;
    /**
     * Reverse geocode coordinates to get an address
     */
    private reverseGeocode;
    /**
     * Process normalized addresses from API response
     */
    private processDireccionesNormalizadas;
    /**
     * Process streets from API response
     */
    private processCalles;
    /**
     * Get coordinates for an address
     */
    getCoordinates(lugar: {
        nombre: string;
        descripcion: string;
    }): Promise<Coordinates | undefined>;
    /**
     * Get SMP (cadastral identifier) for an address
     */
    getSMP(lugar: {
        nombre: string;
        descripcion: string;
        tipo: string;
        codigo?: string;
        altura?: string | number;
        calle?: {
            codigo: string;
        };
    }): Promise<string | undefined>;
    /**
     * Check if the normalizer is initialized
     */
    static inicializado(): boolean;
}
