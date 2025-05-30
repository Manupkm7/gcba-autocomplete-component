import type { DireccionSuggestion } from "../types/direction.types";
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
export declare const AddressSearch: React.FC<AddressSearchProps>;
export {};
