# autocomplete gcba component

A React component for searching and selecting addresses in Argentina, with support for coordinates and cadastral data.

## Features

- Search for addresses by street name and number
- Search for street intersections
- Search by coordinates
- Reverse geocoding
- Customizable styling
- TypeScript support
- Responsive design
- Multiple address selection

## Installation

\`\`\`bash
npm install autocomplete-gcba-component
\`\`\`

or

\`\`\`bash
yarn add autocomplete-gcba-component
\`\`\`

## Usage

### Basic Usage

\`\`\`jsx
import { AddressSearch, DireccionSuggestion } from 'autocomplete-gcba-component';

function App() {
return (
<div>
<h1>Address Search Example</h1>
<AddressSearch
onAddressesChange={(addresses) => console.log('Selected addresses:', addresses)}
/>
</div>
);
}
\`\`\`

### With Custom Styling

\`\`\`jsx
import { AddressSearch } from 'address-search-ar';

function App() {
return (
<div>
<h1>Address Search Example</h1>
<AddressSearch
onAddressesChange={(addresses) => console.log('Selected addresses:', addresses)}
placeholder="Enter an address or coordinates..."
inputClassName="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
suggestionsContainerClassName="border-gray-200 rounded-md"
suggestionItemClassName="hover:bg-blue-50"
/>
</div>
);
}
\`\`\`

### Using the Hook

\`\`\`jsx
import { useAddressSearch } from 'address-search-ar';

function CustomAddressSearch() {
const {
searchText,
suggestions,
selectedAddresses,
isLoading,
error,
showSuggestions,
handleInputChange,
handleSelectSuggestion,
handleRemoveAddress,
handleInputFocus,
handleInputBlur,
} = useAddressSearch({
maxSuggestions: 5,
debug: true,
});

return (
<div>
<input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Search for an address"
      />

      {/* Render suggestions and selected addresses */}
      {/* ... */}
    </div>

);
}
\`\`\`

## Props

| Prop                                  | Type     | Default                             | Description                                          |
| ------------------------------------- | -------- | ----------------------------------- | ---------------------------------------------------- |
| `maxSuggestions`                      | number   | 10                                  | Maximum number of suggestions to show                |
| `onAddressSelect`                     | function | -                                   | Callback when an address is selected                 |
| `onAddressesChange`                   | function | -                                   | Callback when the list of selected addresses changes |
| `placeholder`                         | string   | "Buscar dirección o coordenadas..." | Input placeholder text                               |
| `debug`                               | boolean  | false                               | Enable debug logging                                 |
| `serverTimeout`                       | number   | 5000                                | Timeout for API requests in milliseconds             |
| `className`                           | string   | ""                                  | Class name for the container                         |
| `inputClassName`                      | string   | ""                                  | Class name for the input                             |
| `suggestionsClassName`                | string   | ""                                  | Class name for the suggestions                       |
| `suggestionItemClassName`             | string   | ""                                  | Class name for each suggestion item                  |
| `selectedAddressesClassName`          | string   | ""                                  | Class name for the selected addresses container      |
| `loadingClassName`                    | string   | ""                                  | Class name for the loading indicator                 |
| `suggestionsContainerClassName`       | string   | ""                                  | Class name for the suggestions container             |
| `selectedAddressesContainerClassName` | string   | ""                                  | Class name for the selected addresses container      |
| `selectedAddressItemClassName`        | string   | ""                                  | Class name for each selected address item            |
| `removeButtonClassName`               | string   | ""                                  | Class name for the remove button                     |
| `errorClassName`                      | string   | ""                                  | Class name for error messages                        |
| `iconClassName`                       | string   | ""                                  | Class name for icons                                 |
| `titleClassName`                      | string   | ""                                  | Class name for titles                                |
| `subtitleClassName`                   | string   | ""                                  | Class name for subtitles                             |
| `coordsClassName`                     | string   | ""                                  | Class name for coordinate text                       |
| `smpClassName`                        | string   | ""                                  | Class name for SMP (cadastral) text                  |

## API

### AddressSearch Component

The main component for searching and selecting addresses.

### useAddressSearch Hook

A hook that provides the core functionality for address searching.

### ApiNormalizer

A class that handles API requests to the USIG and Catastro web services.

### LocalNormalizer

A class that provides offline address normalization using a mock database.

## License

MIT
