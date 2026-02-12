import { Header } from "@/components/Header";
import { FinanceiroTabProvider, FinanceiroTabs, useFinanceiroTab } from "@/components/FinanceiroTabs";
import { FinanceiroActions } from "@/components/FinanceiroActions";
import { FinanceiroTable } from "@/components/FinanceiroTable";
import { FinanceiroOverview } from "@/components/FinanceiroOverview";
import { CompeticoesActions } from "@/components/CompeticoesActions";
import { CompeticoesTable } from "@/components/CompeticoesTable";
import { RecebimentosActions } from "@/components/RecebimentosActions";
import { RecebimentosTable } from "@/components/RecebimentosTable";
import { RepassesActions } from "@/components/RepassesActions";
import { RepassesTable } from "@/components/RepassesTable";
import { Pagination } from "@/components/Pagination";

const FinanceiroContent = () => {
  const { activeTab } = useFinanceiroTab();

  if (activeTab === "overview") {
    return <FinanceiroOverview />;
  }

  if (activeTab === "competitions") {
    return (
      <>
        <CompeticoesActions />
        <CompeticoesTable />
        <Pagination />
      </>
    );
  }

  if (activeTab === "receipts") {
    return (
      <>
        <RecebimentosActions />
        <RecebimentosTable />
        <Pagination />
      </>
    );
  }

  if (activeTab === "transfers") {
    return (
      <>
        <RepassesActions />
        <RepassesTable />
        <Pagination />
      </>
    );
  }

  return (
    <>
      <FinanceiroActions />
      <FinanceiroTable />
      <Pagination />
    </>
  );
};

const Financeiro = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 pt-24">
        <FinanceiroTabProvider>
          <FinanceiroTabs />
          <FinanceiroContent />
        </FinanceiroTabProvider>
      </main>
    </div>
  );
};

export default Financeiro;
