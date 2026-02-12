import { createContext, useContext, useState, ReactNode } from "react";

type TabType = "detalhes" | "inscricoes" | "ranking";

interface CompeticaoDetalheTabContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const CompeticaoDetalheTabContext = createContext<CompeticaoDetalheTabContextType | undefined>(undefined);

export const useCompeticaoDetalheTab = () => {
  const context = useContext(CompeticaoDetalheTabContext);
  if (!context) {
    throw new Error("useCompeticaoDetalheTab must be used within CompeticaoDetalheTabProvider");
  }
  return context;
};

export const CompeticaoDetalheTabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<TabType>("detalhes");

  return (
    <CompeticaoDetalheTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </CompeticaoDetalheTabContext.Provider>
  );
};

export const CompeticaoDetalheTabs = () => {
  const { activeTab, setActiveTab } = useCompeticaoDetalheTab();

  return (
    <div className="mb-8">
      <div className="flex items-center border-b border-border">
        <button
          onClick={() => setActiveTab("detalhes")}
          className={`flex-1 pb-4 text-lg font-medium transition-colors relative ${
            activeTab === "detalhes"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Detalhes da competição
          {activeTab === "detalhes" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        
        <button
          onClick={() => setActiveTab("inscricoes")}
          className={`flex-1 pb-4 text-lg font-medium transition-colors relative ${
            activeTab === "inscricoes"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Inscrições
          {activeTab === "inscricoes" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("ranking")}
          className={`flex-1 pb-4 text-lg font-medium transition-colors relative ${
            activeTab === "ranking"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Ranking
          {activeTab === "ranking" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>
    </div>
  );
};
