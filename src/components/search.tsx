import { useState, useRef, useEffect, useCallback } from "react";
import { ApiNormalizer } from "@/lib/api-normalizer";
import type { DireccionSuggestion, DireccionType, Calle } from "../types/direction.types";
import { LoaderIcon } from "@/assets/Loader";
import NavigationIcon from "@/assets/Navigation";

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

export const AddressSearch: React.FC<AddressSearchProps> = ({
  maxSuggestions = 10,
  onAddressSelect,
  onAddressesRemove,
  placeholder = "Buscar dirección o coordenadas...",
  debug = false,
  className = "",
  inputClassName = "",
  selectedAddresses = [],
  suggestionsClassName = "",
  suggestionItemClassName = "",
  selectedAddressesClassName = "",
  loadingClassName = "",
  suggestionsContainerClassName = "",
  selectedAddressesContainerClassName = "",
  selectedAddressItemClassName = "",
  removeButtonClassName = "",
  errorClassName = "",
  iconClassName = "",
  titleClassName = "",
  coordsClassName = "",
  smpClassName = "",
  serverTimeout = 5000,
  isDebug = false,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<DireccionSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputTimerRef = useRef<NodeJS.Timeout | null>(null);
  const normalizadorRef = useRef<ApiNormalizer | null>(null);
  console.log(selectedAddresses);
  // Initialize the ApiNormalizer on component mount
  useEffect(() => {
    normalizadorRef.current = new ApiNormalizer({
      debug,
      maxSuggestions,
      serverTimeout,
    });

    return () => {
      // Clean up any pending requests on unmount
      if (inputTimerRef.current) {
        clearTimeout(inputTimerRef.current);
      }
      if (normalizadorRef.current) {
        normalizadorRef.current.abort();
      }
    };
  }, [debug, maxSuggestions, serverTimeout]);

  const convertToDireccionSuggestion = (
    d: DireccionType | Calle
  ): DireccionSuggestion => {
    if (d.tipo === "CALLE") {
      // It's a Calle type
      return {
        title: d.nombre,
        subTitle: d.descripcion || "CABA",
        type: "CALLE",
        category: "CALLE",
        suggesterName: "Direcciones",
        data: {
          nombre: d.nombre,
          descripcion: d.descripcion || "",
          tipo: "CALLE",
          codigo: d.codigo,
          altura_par: d.altura_par,
          altura_impar: d.altura_impar,
          calle_alturas: d.calle_alturas,
        },
      };
    } else {
      // It's a DireccionType
      return {
        title: d.nombre,
        subTitle: d.descripcion || "CABA",
        type: d.tipoDireccion,
        category: d.tipoDireccion,
        suggesterName: "Direcciones",
        data: {
          nombre: d.nombre,
          descripcion: d.descripcion || "",
          tipo: d.tipo,
          codigo: d.calle.codigo,
          altura:
            d.tipoDireccion === "DIRECCION_CALLE_ALTURA" ? d.altura : undefined,
          calle: {
            codigo: d.calle.codigo,
          },
          coordenadas: d.coordenadas,
          smp: d.smp,
          barrio: d.barrio,
          comuna: d.comuna,
          altura_par: d.altura_par,
          altura_impar: d.altura_impar,
          calle_alturas: d.calle_alturas,
        },
      };
    }
  };

  const getSuggestions = useCallback(
    async (text: string) => {
      if (debug) {
        console.debug(`getSuggestions('${text}')`);
      }

      if (!normalizadorRef.current || !text || text.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const direcciones = await normalizadorRef.current.normalizar(
          text,
          maxSuggestions
        );
        const results = direcciones.map(convertToDireccionSuggestion);

        setSuggestions(results);

        // Automatically show suggestions when we have results or when loading
        setShowSuggestions(true);

        if (results.length === 0) {
          setError("No se encontraron resultados");
        }
      } catch (error) {
        console.error("Error getting suggestions:", error);
        setSuggestions([]);
        setError("Error al buscar direcciones");
      } finally {
        setIsLoading(false);
      }
    },
    [debug, maxSuggestions]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setError(null);

    // Clear previous timer
    if (inputTimerRef.current) {
      clearTimeout(inputTimerRef.current);
    }

    // Abort any ongoing request
    if (normalizadorRef.current) {
      normalizadorRef.current.abort();
    }

    // Set a new timer to delay the search
    if (value.length >= 3) {
      // Show suggestions container immediately when typing (even before results arrive)
      setShowSuggestions(true);
      setIsLoading(true);

      inputTimerRef.current = setTimeout(() => {
        getSuggestions(value);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion: DireccionSuggestion) => {
    if (isDebug) {
      console.log(suggestion);
    }
    // Add to selected addresses if not already there
    if (
      !selectedAddresses.some(
        (addr) => addr.data?.nombre === suggestion.data?.nombre
      )
    ) {
      onAddressSelect(suggestion);
    }

    // Clear input and suggestions
    setSearchText("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleRemoveAddress = (index: number) => {
    onAddressesRemove(index);
  };

  const handleInputFocus = () => {
    if (searchText.length >= 3) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative max-w-[500px]">
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className={`w-full h-[24px] p-[8px] border rounded ${inputClassName}`}
        />
        {isLoading && (
          <div
            className={`absolute right-[0] top-1/2 transform -translate-y-1/2 ${loadingClassName}`}
          >
            <LoaderIcon className="h-4 w-4 text-gray-500 animate-spin" />
          </div>
        )}

        {(showSuggestions || isLoading) && (
          <div
            className={`absolute z-10 w-full bg-[#FFFFFF] border border-t-0 rounded shadow-lg max-h-[200px] overflow-auto px-[8px] ${suggestionsContainerClassName}`}
          >
            {isLoading ? (
              <div
                className={`p-[8px] flex items-center justify-center gap-[8px] text-gray-500  ${suggestionsClassName}`}
              >
                <LoaderIcon className="h-5 w-2 animate-spin mb-2" />
                <span>Buscando direcciones...</span>
              </div>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.data.nombre}-${index}`}
                  className={`my-[8px] border-b border-[#b8b5b4] last:border-b-0 cursor-pointer hover:bg-[#dfe0e1] transition duration-300 ease-in-out bg-white rounded-[4px] w-[100%] ${suggestionItemClassName}`}
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <div className="flex items-center gap-[8px]">
                    <div>
                      <NavigationIcon
                        className={`h-4 text-[#0042ff] ${iconClassName}`}
                      />
                    </div>
                    <div className="flex flex-center gap-[8px]">
                      <span className={`font-medium text-[14px] truncate ${titleClassName}`}>
                        {suggestion.title}.
                      </span>

                      {suggestion.data.coordenadas && (
                        <span
                          className={`text-xs text-gray-400 truncate ${coordsClassName}`}
                        >
                          Coord: {suggestion.data.coordenadas.x.toFixed(6)},{" "}
                          {suggestion.data.coordenadas.y.toFixed(6)}
                        </span>
                      )}
                      {suggestion.data.smp && (
                        <span
                          className={`text-xs text-gray-400 ${smpClassName}`}
                        >
                          SMP: {suggestion.data.smp}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : searchText.length >= 3 ? (
              <div className={`p-[8px] text-center text-red-500 ${errorClassName}`}>
                {error || "No se encontraron resultados"}
              </div>
            ) : (
              <div
                className={`p-4 text-center text-gray-500 ${suggestionsClassName}`}
              >
                Ingrese al menos 3 caracteres para buscar
              </div>
            )}
          </div>
        )}

        {error && !isLoading && !showSuggestions && (
          <div className={`mt-[8px] text-sm text-red-500 ${errorClassName}`}>
            {error}
          </div>
        )}
      </div>

      {isDebug && (
        <>
          {
            selectedAddresses.length > 0 && (
              <div
                className={`${selectedAddressesClassName} ${selectedAddressesContainerClassName}`}
              >
                <h3 className="text-sm font-medium mb-2">
                  Direcciones seleccionadas:
                </h3>
                <ul className="space-y-2">
                  {selectedAddresses.map((address, index) => (
                    <li
                      key={`selected-${index}`}
                      className={`flex justify-between items-center p-2 bg-gray-50 rounded ${selectedAddressItemClassName}`}
                    >
                      <div className="flex items-center gap-[8px]">
                        <div className="mt-1">
                          <NavigationIcon
                            className={`h-4 w-4 text-[#0042ff] ${iconClassName}`}
                          />
                        </div>
                        <div className="flex flex-center gap-[8px]">
                          <div className={`font-medium ${titleClassName}`}>
                            {address.title}.
                          </div>
                          {address.data.coordenadas && (
                            <div
                              className={`text-xs text-gray-400 ${coordsClassName}`}
                            >
                              Coord: {address.data.coordenadas.x.toFixed(6)},{" "}
                              {address.data.coordenadas.y.toFixed(6)}
                            </div>
                          )}
                          {address.data.smp && (
                            <div className={`text-xs text-gray-400 ${smpClassName}`}>
                              SMP: {address.data.smp}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAddress(index)}
                        className={`text-[#FFF] bg-[#ff0000] rounded-[4px] border-0 h-[24px] w-[24px] cursor-pointer transition duration-300 ease-in-out hover:scale-125 ${removeButtonClassName}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }
        </>

      )}
    </div>
  );
};
