import { useState } from "react";
import { AddressSearch } from "@/components/search";

import type { DireccionSuggestion } from "@/types/direction";

type HomeProps = {
  inputClassName?: string;
  suggestionsContainerClassName?: string;
  suggestionItemClassName?: string;
  selectedAddressesContainerClassName?: string;
};

export const Home = ({
  inputClassName,
  suggestionsContainerClassName,
  suggestionItemClassName,
  selectedAddressesContainerClassName,
}: HomeProps) => {
  const [selectedAddresses, setSelectedAddresses] = useState<
    DireccionSuggestion[]
  >([]);

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

      {selectedAddresses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">
            Direcciones guardadas ({selectedAddresses.length})
          </h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-xs">
            {JSON.stringify(selectedAddresses, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
};
