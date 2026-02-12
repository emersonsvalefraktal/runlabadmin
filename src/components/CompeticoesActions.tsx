import { Search, SlidersHorizontal, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExportDialog } from "@/components/ExportDialog";
import { FilterDialog } from "@/components/FilterDialog";
import { useState } from "react";

export const CompeticoesActions = () => {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  return (
    <>
    <div className="flex items-center justify-between gap-4 mb-10">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar competição..." 
          className="pl-10 bg-card border-border"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="secondary" 
          onClick={() => setFilterDialogOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
        <span className="text-muted-foreground">|</span>
        <Button 
          variant="secondary" 
          onClick={() => setExportDialogOpen(true)}
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>
    </div>

    <ExportDialog open={exportDialogOpen} onOpenChange={setExportDialogOpen} />
    <FilterDialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen} />
    </>
  );
};
