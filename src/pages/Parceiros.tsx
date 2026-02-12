import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { PartnersTabs } from "@/components/PartnersTabs";
import { PartnersActions } from "@/components/PartnersActions";
import { PartnersTable } from "@/components/PartnersTable";
import { PartnersRequestsTable } from "@/components/PartnersRequestsTable";
import { Pagination } from "@/components/Pagination";

const Parceiros = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"partners" | "requests">("partners");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "requests") {
      setActiveTab("requests");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 pt-24">
        <PartnersTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "partners" ? (
          <>
            <PartnersActions />
            <PartnersTable />
            <Pagination />
          </>
        ) : (
          <>
            <PartnersRequestsTable />
            <Pagination />
          </>
        )}
      </main>
    </div>
  );
};

export default Parceiros;
