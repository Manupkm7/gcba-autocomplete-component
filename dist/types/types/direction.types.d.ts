export type TipoDirection = "DIRECCION_CALLE_ALTURA" | "DIRECCION_CALLE_Y_CALLE" | "INVALIDO";
export interface Coordinates {
    x: number;
    y: number;
    srid?: number;
    altura_par?: string;
    altura_impar?: string;
    calle_alturas?: {
        inicio: number;
        fin: number;
    }[];
}
export interface Alt {
    inicio: number;
    fin: number;
}
export interface Calle {
    codigo: string;
    nombre: string;
    partido?: string;
    localidad?: string;
    descripcion?: string;
    tipo: "CALLE";
    alturas: Alt[];
    altura_par?: string;
    altura_impar?: string;
    calle_alturas?: {
        inicio: number;
        fin: number;
    }[];
}
export interface DireccionBase {
    calle: Calle;
    calleCruce?: Calle;
    altura?: number;
    altura_par?: string;
    altura_impar?: string;
    calle_alturas?: {
        inicio: number;
        fin: number;
    }[];
    tipoDireccion: TipoDirection;
    smp?: string;
    coordenadas?: Coordinates;
    tipo: "DIRECCION";
    nombre: string;
    descripcion?: string;
    barrio?: string;
    comuna?: string;
}
export interface DireccionCalleAltura extends DireccionBase {
    tipoDireccion: "DIRECCION_CALLE_ALTURA";
    altura: number;
}
export interface DireccionCalleYCalle extends DireccionBase {
    tipoDireccion: "DIRECCION_CALLE_Y_CALLE";
    calleCruce: Calle;
}
export type DireccionType = DireccionCalleAltura | DireccionCalleYCalle;
export interface DireccionInput {
    cod_calle?: string;
    cod_calle2?: string;
    cod_calle_cruce?: string;
    nombre_calle?: string;
    nombre?: string;
    calle2?: string;
    nombre_calle_cruce?: string;
    nombre_partido?: string;
    nombre_localidad?: string;
    altura?: number;
    tipo?: TipoDirection;
    smp?: string;
    coordenadas?: string | Coordinates;
    calle?: Calle;
    calle_cruce?: Calle;
}
export interface DireccionSuggestion {
    title: string;
    subTitle: string;
    type: string;
    category: string;
    suggesterName: string;
    data: {
        nombre: string;
        descripcion: string;
        tipo: string;
        codigo?: string;
        altura_par?: string;
        altura_impar?: string;
        calle_alturas?: {
            inicio: number;
            fin: number;
        }[];
        altura?: string | number;
        calle?: {
            codigo: string;
        };
        coordenadas?: Coordinates;
        smp?: string;
        barrio?: string;
        comuna?: string;
    };
}
