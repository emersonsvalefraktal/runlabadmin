import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExportDialog = ({ open, onOpenChange }: ExportDialogProps) => {
  const [exportFormat, setExportFormat] = useState("csv");
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: `Exportando dados em formato ${exportFormat.toUpperCase()}...`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1E1E1E] border-0 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">Exportar</DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <RadioGroup value={exportFormat} onValueChange={setExportFormat}>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="csv" id="csv" className="border-muted-foreground" />
              <Label htmlFor="csv" className="text-foreground cursor-pointer">
                Exportar em CSV
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="flex-1 bg-[#2A2A2A] text-foreground hover:bg-[#333333]"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleExport}
            className="flex-1 bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90 font-medium"
          >
            Exportar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
