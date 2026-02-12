import { Header } from "@/components/Header";
import { GestaoCompeticoesTabProvider, GestaoCompeticoesTabs, useGestaoCompeticoesTab } from "@/components/GestaoCompeticoesTabs";
import { CompeticoesFilterProvider } from "@/contexts/CompeticoesFilterContext";
import { CompeticoesActions } from "@/components/CompeticoesActions";
import { CompeticoesTable } from "@/components/CompeticoesTable";
import { CampeonatosActions } from "@/components/CampeonatosActions";
import { CampeonatosTable } from "@/components/CampeonatosTable";

const GestaoCompeticoesContent = () => {
  const { activeTab } = useGestaoCompeticoesTab();

  if (activeTab === "championships") {
    return (
      <>
        <CampeonatosActions />
        <CampeonatosTable />
      </>
    );
  }

  return (
    <CompeticoesFilterProvider>
      <CompeticoesActions />
      <CompeticoesTable />
    </CompeticoesFilterProvider>
  );
};

const GestaoCompeticoes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 pt-24">
        <GestaoCompeticoesTabProvider>
          <GestaoCompeticoesTabs />
          <GestaoCompeticoesContent />
        </GestaoCompeticoesTabProvider>
      </main>
    </div>
  );
};

export default GestaoCompeticoes;
