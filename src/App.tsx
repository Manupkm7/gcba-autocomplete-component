import { useState } from 'react';
import { AddressSearch } from './components/search';
import { DireccionSuggestion } from './types';


export const App = () => {
    const [address, setAddress] = useState<DireccionSuggestion[]>([]);

    const handleAddressSelect = (newValue: DireccionSuggestion) => {
        const newAddress = [...address, newValue];
        setAddress(newAddress);
    };

    const handleAddressesRemove = (index: number) => {
        const newAddress = address.filter((_, i) => i !== index);
        setAddress(newAddress);
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <div className="space-y-4">
                {/* Input de búsqueda */}
                <div className="relative">
                    <div className="flex gap-2">
                        <div className="relative flex-grow">
                            <AddressSearch onAddressSelect={handleAddressSelect} debug onAddressesRemove={handleAddressesRemove} selectedAddresses={address} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
