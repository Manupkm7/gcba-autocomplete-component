import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { ApiNormalizer } from "@/lib/api-normalizer";
import type {
  DireccionSuggestion,
  DireccionType,
  Calle,
} from "../types/direction.types";

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

export function useAddressSearch(
  options: AddressSearchOptions = {}
): UseAddressSearchReturn {
  const { maxSuggestions = 10, debug = false, serverTimeout = 5000 } = options;

  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<DireccionSuggestion[]>([]);
  const [selectedAddresses, setSelectedAddresses] = useState<
    DireccionSuggestion[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputTimerRef = useRef<NodeJS.Timeout | null>(null);
  const normalizadorRef = useRef<ApiNormalizer | null>(null);

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
        },
      };
    }
  };

  const fetchSuggestions = useCallback(
    async (text: string) => {
      if (debug) {
        console.debug(`fetchSuggestions('${text}')`);
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
      inputTimerRef.current = setTimeout(() => {
        fetchSuggestions(value);
      }, 3000);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion: DireccionSuggestion) => {
    // Add to selected addresses if not already there
    if (
      !selectedAddresses.some(
        (addr) => addr.data.nombre === suggestion.data.nombre
      )
    ) {
      setSelectedAddresses((prev) => [...prev, suggestion]);
    }

    // Clear input and suggestions
    setSearchText("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleRemoveAddress = (index: number) => {
    setSelectedAddresses((prev) => {
      const newAddresses = [...prev];
      newAddresses.splice(index, 1);
      return newAddresses;
    });
  };

  const handleInputFocus = () => {
    if (searchText.length >= 3 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return {
    searchText,
    setSearchText,
    suggestions,
    selectedAddresses,
    isLoading,
    error,
    showSuggestions,
    setShowSuggestions,
    handleInputChange,
    handleSelectSuggestion,
    handleRemoveAddress,
    handleInputFocus,
    handleInputBlur,
  };
}
