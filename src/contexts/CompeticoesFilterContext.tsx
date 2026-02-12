import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type CompetitionFilters = {
  search?: string;
  status?: string;
  periodo?: string;
  tipo?: string;
  modalidade?: string;
};

type CompeticoesFilterContextType = {
  filters: CompetitionFilters;
  setFilters: (f: CompetitionFilters | ((prev: CompetitionFilters) => CompetitionFilters)) => void;
  clearFilters: () => void;
};

const defaultContextValue: CompeticoesFilterContextType = {
  filters: {},
  setFilters: () => {},
  clearFilters: () => {},
};

const CompeticoesFilterContext = createContext<CompeticoesFilterContextType>(defaultContextValue);

export function useCompeticoesFilters() {
  return useContext(CompeticoesFilterContext);
}

export function CompeticoesFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<CompetitionFilters>({});
  const setFilters = useCallback((f: CompetitionFilters | ((prev: CompetitionFilters) => CompetitionFilters)) => {
    setFiltersState((prev) => (typeof f === "function" ? f(prev) : f));
  }, []);
  const clearFilters = useCallback(() => setFiltersState({}), []);
  return (
    <CompeticoesFilterContext.Provider value={{ filters, setFilters, clearFilters }}>
      {children}
    </CompeticoesFilterContext.Provider>
  );
}
