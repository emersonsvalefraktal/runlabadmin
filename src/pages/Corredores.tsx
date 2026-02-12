import { Header } from "@/components/Header";
import { CorredoresActions } from "@/components/CorredoresActions";
import { CorredoresTable } from "@/components/CorredoresTable";
import { Pagination } from "@/components/Pagination";

const Corredores = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 pt-24">
        <CorredoresActions />
        <CorredoresTable />
        <Pagination />
      </main>
    </div>
  );
};

export default Corredores;
