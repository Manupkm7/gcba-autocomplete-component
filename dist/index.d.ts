import React from 'react';
import { DireccionSuggestion } from '@/types/direction';

interface AddressSearchProps {
    maxSuggestions?: number;
    onAddressSelect?: (address: DireccionSuggestion) => void;
    onAddressesChange?: (addresses: DireccionSuggestion[]) => void;
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
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectSuggestion: (suggestion: DireccionSuggestion) => void;
    handleRemoveAddress: (index: number) => void;
    handleInputFocus: () => void;
    handleInputBlur: () => void;
}
declare function useAddressSearch(options?: AddressSearchOptions): UseAddressSearchReturn;

export { AddressSearch, useAddressSearch };
