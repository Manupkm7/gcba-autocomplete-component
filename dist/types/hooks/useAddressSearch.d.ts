import type React from "react";
import type { DireccionSuggestion } from "@/types/direction";
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
export declare function useAddressSearch(options?: AddressSearchOptions): UseAddressSearchReturn;
export {};
