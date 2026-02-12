import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Download, Send, Plus } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import { ExportDialog } from "./ExportDialog";
import { PartnersFilterDialog } from "./PartnersFilterDialog";
import { PushNotificationSheet } from "./PushNotificationSheet";
import { RegisterPartnerSheet } from "./RegisterPartnerSheet";

export const PartnersActions = () => {
  const { hasPermission } = usePermissions();
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPushOpen, setIsPushOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar parceiro..."
            className="pl-10 bg-input border-border text-foreground"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            onClick={() => setIsFilterOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtrar
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={() => setIsExportOpen(true)}
          >
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          
          <div className="w-px h-6 bg-border" />
          
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2"
            onClick={() => setIsPushOpen(true)}
          >
            <Send className="h-4 w-4" />
            Enviar push
          </Button>
          
          {hasPermission("usuarios.add") && (
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              onClick={() => setIsRegisterOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Cadastrar parceiro
            </Button>
          )}
        </div>
      </div>

      <ExportDialog open={isExportOpen} onOpenChange={setIsExportOpen} />
      <PartnersFilterDialog open={isFilterOpen} onOpenChange={setIsFilterOpen} />
      <PushNotificationSheet open={isPushOpen} onOpenChange={setIsPushOpen} />
      <RegisterPartnerSheet open={isRegisterOpen} onOpenChange={setIsRegisterOpen} />
    </>
  );
};
