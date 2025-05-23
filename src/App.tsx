import { AddressSearch } from "@/components/search";

import type { DireccionSuggestion } from "@/types/direction";

type SearchProps = {
  inputClassName?: string;
  suggestionsContainerClassName?: string;
  suggestionItemClassName?: string;
  selectedAddressesContainerClassName?: string;
  setSelectedAddresses: (addresses: DireccionSuggestion[]) => void;
};

export const Search = ({
  inputClassName,
  suggestionsContainerClassName,
  suggestionItemClassName,
  selectedAddressesContainerClassName,
  setSelectedAddresses,
}: SearchProps) => {
  const handleAddressesChange = (addresses: DireccionSuggestion[]) => {
    setSelectedAddresses(addresses);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <AddressSearch
        maxSuggestions={5}
        onAddressesChange={handleAddressesChange}
        placeholder="Ingrese una dirección"
        debug={true}
        serverTimeout={8000}
        inputClassName={inputClassName}
        suggestionsContainerClassName={suggestionsContainerClassName}
        suggestionItemClassName={suggestionItemClassName}
        selectedAddressesContainerClassName={
          selectedAddressesContainerClassName
        }
      />
    </main>
  );
};
