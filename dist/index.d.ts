import React$1 from 'react';

type TipoDirection = "DIRECCION_CALLE_ALTURA" | "DIRECCION_CALLE_Y_CALLE" | "INVALIDO";
interface Coordinates {
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
interface Alt {
    inicio: number;
    fin: number;
}
interface Calle {
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
interface DireccionBase {
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
interface DireccionCalleAltura extends DireccionBase {
    tipoDireccion: "DIRECCION_CALLE_ALTURA";
    altura: number;
}
interface DireccionCalleYCalle extends DireccionBase {
    tipoDireccion: "DIRECCION_CALLE_Y_CALLE";
    calleCruce: Calle;
}
type DireccionType = DireccionCalleAltura | DireccionCalleYCalle;
interface DireccionInput {
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
interface DireccionSuggestion {
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

interface AddressSearchProps {
    maxSuggestions?: number;
    onAddressSelect: (address: DireccionSuggestion) => void;
    onAddressesRemove: (index: number) => void;
    selectedAddresses: DireccionSuggestion[];
    placeholder?: string;
    debug?: boolean;
    className?: string;
    inputClassName?: string;
    suggestionsClassName?: string;
    suggestionItemClassName?: string;
    selectedAddressesClassName?: string;
    loadingClassName?: string;
    suggestionsContainerClassName?: string;
    selectedAddressesContainerClassName?: string;
    selectedAddressItemClassName?: string;
    removeButtonClassName?: string;
    errorClassName?: string;
    iconClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    coordsClassName?: string;
    smpClassName?: string;
    serverTimeout?: number;
    isDebug?: boolean;
}
declare const AddressSearch: React.FC<AddressSearchProps>;

interface AddressSearchOptions {
    maxSuggestions?: number;
    debug?: boolean;
    serverTimeout?: number;
}
interface UseAddressSearchReturn {
    searchText: string;
    setSearchText: (text: string) => void;
    suggestions: DireccionSuggestion[];
    selectedAddresses: DireccionSuggestion[];
    isLoading: boolean;
    error: string | null;
    showSuggestions: boolean;
    setShowSuggestions: (show: boolean) => void;
    handleInputChange: (e: React$1.ChangeEvent<HTMLInputElement>) => void;
    handleSelectSuggestion: (suggestion: DireccionSuggestion) => void;
    handleRemoveAddress: (index: number) => void;
    handleInputFocus: () => void;
    handleInputBlur: () => void;
}
declare function useAddressSearch(options?: AddressSearchOptions): UseAddressSearchReturn;

export { AddressSearch, useAddressSearch };
export type { Alt, Calle, Coordinates, DireccionBase, DireccionCalleAltura, DireccionCalleYCalle, DireccionInput, DireccionSuggestion, DireccionType, TipoDirection };
