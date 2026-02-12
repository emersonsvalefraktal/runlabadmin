import { Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExportDialog } from "@/components/ExportDialog";
import { useState } from "react";

export const RecebimentosActions = () => {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  return (
    <>
    <div className="flex items-center justify-between gap-4 mb-10">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Buscar recebimento..." 
          className="pl-10 bg-card border-border"
        />
      </div>
      
      <Button 
        variant="secondary" 
        onClick={() => setExportDialogOpen(true)}
      >
        <Download className="h-4 w-4 mr-2" />
        Exportar
      </Button>
    </div>

    <ExportDialog open={exportDialogOpen} onOpenChange={setExportDialogOpen} />
    </>
  );
};
