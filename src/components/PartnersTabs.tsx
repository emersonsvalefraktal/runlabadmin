import { useState } from "react";

interface PartnersTabsProps {
  activeTab: "partners" | "requests";
  onTabChange: (tab: "partners" | "requests") => void;
}

export const PartnersTabs = ({ activeTab, onTabChange }: PartnersTabsProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center border-b border-border">
        <button
          onClick={() => onTabChange("partners")}
          className={`flex-1 pb-4 text-lg font-medium transition-colors relative ${
            activeTab === "partners"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Parceiros
          {activeTab === "partners" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        
        <button
          onClick={() => onTabChange("requests")}
          className={`flex-1 pb-4 text-lg font-medium transition-colors relative ${
            activeTab === "requests"
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Solicitações de novos parceiros
          {activeTab === "requests" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>
    </div>
  );
};
