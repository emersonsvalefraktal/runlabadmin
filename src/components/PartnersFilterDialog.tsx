import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PartnersFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PartnersFilterDialog = ({ open, onOpenChange }: PartnersFilterDialogProps) => {
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [inscriptions, setInscriptions] = useState("");
  const [customInscriptions, setCustomInscriptions] = useState("");

  const handleApplyFilters = () => {
    // Implementar lógica de filtros aqui
    console.log({ status, type, city, state, inscriptions, customInscriptions });
    onOpenChange(false);
  };

  const handleClearFilters = () => {
    setStatus("");
    setType("");
    setCity("");
    setState("");
    setInscriptions("");
    setCustomInscriptions("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-0">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Filtro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Status</Label>
            <div className="flex flex-wrap gap-2">
              {["Em analise", "Rejeitado", "Ativo", "Inativo"].map((statusOption) => (
                <Button
                  key={statusOption}
                  variant={status === statusOption ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatus(status === statusOption ? "" : statusOption)}
                  className={
                    status === statusOption
                      ? "bg-success text-success-foreground"
                      : "bg-[#1A1A1A] text-foreground border-0"
                  }
                >
                  {statusOption}
                </Button>
              ))}
            </div>
          </div>

          {/* Tipo de parceiro */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Tipo de parceiro</Label>
            <div className="flex flex-wrap gap-2">
              {["Assessoria", "Academia", "Treinador", "Individual", "Influenciador"].map((typeOption) => (
                <Button
                  key={typeOption}
                  variant={type === typeOption ? "default" : "outline"}
                  size="sm"
                  onClick={() => setType(type === typeOption ? "" : typeOption)}
                  className={
                    type === typeOption
                      ? "bg-success text-success-foreground"
                      : "bg-[#1A1A1A] text-foreground border-0"
                  }
                >
                  {typeOption}
                </Button>
              ))}
            </div>
          </div>

          {/* Localização */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Cidade</Label>
                <Input
                  placeholder="Ex: São Paulo"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground transition-all hover:border-primary"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Estado</Label>
                <Input
                  placeholder="Ex: SP"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground transition-all hover:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Quantidade de inscrições totais */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Quantidade de inscrições totais</Label>
            <div className="flex flex-wrap gap-2">
              {["0 inscrições", "1-50 inscrições", "+50 inscrições", "Outro"].map((inscriptionOption) => (
                <Button
                  key={inscriptionOption}
                  variant={inscriptions === inscriptionOption ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInscriptions(inscriptions === inscriptionOption ? "" : inscriptionOption)}
                  className={
                    inscriptions === inscriptionOption
                      ? "bg-success text-success-foreground"
                      : "bg-[#1A1A1A] text-foreground border-0"
                  }
                >
                  {inscriptionOption}
                </Button>
              ))}
            </div>
            <Input
              placeholder="Insira outra quantidade"
              value={customInscriptions}
              onChange={(e) => setCustomInscriptions(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground transition-all hover:border-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button
            onClick={handleApplyFilters}
            className="w-full bg-success text-success-foreground hover:bg-success/90"
          >
            Aplicar filtros
          </Button>
          <Button
            variant="secondary"
            onClick={handleClearFilters}
            className="w-full"
          >
            Limpar filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
