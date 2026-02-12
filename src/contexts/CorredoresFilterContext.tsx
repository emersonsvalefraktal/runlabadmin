import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { CorredorFilters } from "@/hooks/useCorredores";

type CorredoresFilterContextType = {
  filters: CorredorFilters;
  setFilters: (f: CorredorFilters | ((prev: CorredorFilters) => CorredorFilters)) => void;
  clearFilters: () => void;
};

const defaultContextValue: CorredoresFilterContextType = {
  filters: {},
  setFilters: () => {},
  clearFilters: () => {},
};

const CorredoresFilterContext = createContext<CorredoresFilterContextType>(defaultContextValue);

export function useCorredoresFilters() {
  return useContext(CorredoresFilterContext);
}

export function CorredoresFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<CorredorFilters>({});
  const setFilters = useCallback((f: CorredorFilters | ((prev: CorredorFilters) => CorredorFilters)) => {
    setFiltersState((prev) => (typeof f === "function" ? f(prev) : f));
  }, []);
  const clearFilters = useCallback(() => setFiltersState({}), []);
  return (
    <CorredoresFilterContext.Provider value={{ filters, setFilters, clearFilters }}>
      {children}
    </CorredoresFilterContext.Provider>
  );
}
