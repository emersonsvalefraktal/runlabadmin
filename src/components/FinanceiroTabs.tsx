import { useState, createContext, useContext, ReactNode } from "react";

type TabType = "overview" | "competitions" | "receipts" | "transfers";

const FinanceiroTabContext = createContext<{
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}>({
  activeTab: "overview",
  setActiveTab: () => {},
});

export const useFinanceiroTab = () => useContext(FinanceiroTabContext);

export const FinanceiroTabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <FinanceiroTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </FinanceiroTabContext.Provider>
  );
};

export const FinanceiroTabs = () => {
  const { activeTab, setActiveTab } = useFinanceiroTab();

  return (
    <div className="mb-8">
      <div className="flex items-center border-b border-border">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 pb-4 text-lg font-medium transition-colors relative ${
            activeTab === "overview"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Visão geral
          {activeTab === "overview" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        
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
          onClick={() => setActiveTab("receipts")}
          className={`flex-1 pb-4 text-lg font-medium transition-colors relative ${
            activeTab === "receipts"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Recebimentos
          {activeTab === "receipts" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("transfers")}
          className={`flex-1 pb-4 text-lg font-medium transition-colors relative ${
            activeTab === "transfers"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Repasses
          {activeTab === "transfers" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>
    </div>
  );
};
