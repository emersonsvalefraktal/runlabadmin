import { createContext, useContext, useState, ReactNode } from "react";

type TabType = "competitions" | "championships";

interface GestaoCompeticoesTabContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const GestaoCompeticoesTabContext = createContext<GestaoCompeticoesTabContextType | undefined>(undefined);

export const useGestaoCompeticoesTab = () => {
  const context = useContext(GestaoCompeticoesTabContext);
  if (!context) {
    throw new Error("useGestaoCompeticoesTab must be used within GestaoCompeticoesTabProvider");
  }
  return context;
};

export const GestaoCompeticoesTabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<TabType>("competitions");

  return (
    <GestaoCompeticoesTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </GestaoCompeticoesTabContext.Provider>
  );
};

export const GestaoCompeticoesTabs = () => {
  const { activeTab, setActiveTab } = useGestaoCompeticoesTab();

  return (
    <div className="mb-8">
      <div className="flex items-center border-b border-border">
        <button
          onClick={() => setActiveTab("competitions")}
          className={`flex-1 pb-4 text-lg font-medium transition-colors relative ${
            activeTab === "competitions"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Competições
          {activeTab === "competitions" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        
        <button
          onClick={() => setActiveTab("championships")}
          className={`flex-1 pb-4 text-lg font-medium transition-colors relative ${
            activeTab === "championships"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Campeonatos
          {activeTab === "championships" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>
    </div>
  );
};
