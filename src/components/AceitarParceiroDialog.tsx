import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { X, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AceitarParceiroDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (dataInicio?: Date, dataFim?: Date) => void;
  parceiroNome?: string;
}

export const AceitarParceiroDialog = ({ 
  open, 
  onOpenChange, 
  onConfirm,
  parceiroNome 
}: AceitarParceiroDialogProps) => {
  const [dataInicio, setDataInicio] = useState<Date>();
  const [dataFim, setDataFim] = useState<Date>();
  const [semDataValidade, setSemDataValidade] = useState(false);

  const handleConfirm = () => {
    if (semDataValidade) {
      onConfirm(undefined, undefined);
    } else {
      onConfirm(dataInicio, dataFim);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2a2a2a] border-0 sm:max-w-[600px] p-8">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Close</span>
        </button>

        {/* Content */}
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              Definir validade da parceria
            </h2>
            <p className="text-sm text-foreground">
              Confirme abaixo a data de validade da parceria.
            </p>
            <p className="text-sm text-muted-foreground">
              Se não preencher, a parceria ficará ativa sem prazo definido.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Date Pickers */}
          <div className="grid grid-cols-2 gap-4">
            {/* Data de validade início */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Data de validade
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={semDataValidade}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-[#1A1A1A] border-0 hover:bg-[#1A1A1A]/80",
                      !dataInicio && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataInicio ? format(dataInicio, "dd/MM/yyyy") : <span>Ex: 01/10/2025</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#2a2a2a] border-border" align="start">
                  <Calendar
                    mode="single"
                    selected={dataInicio}
                    onSelect={setDataInicio}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Data de validade fim */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Data de validade
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={semDataValidade}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-[#1A1A1A] border-0 hover:bg-[#1A1A1A]/80",
                      !dataFim && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataFim ? format(dataFim, "dd/MM/yyyy") : <span>Ex: 01/10/2026</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#2a2a2a] border-border" align="start">
                  <Calendar
                    mode="single"
                    selected={dataFim}
                    onSelect={setDataFim}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sem-validade" 
              checked={semDataValidade}
              onCheckedChange={(checked) => {
                setSemDataValidade(checked as boolean);
                if (checked) {
                  setDataInicio(undefined);
                  setDataFim(undefined);
                }
              }}
            />
            <label
              htmlFor="sem-validade"
              className="text-sm text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Sem data de validade
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-transparent border-2 border-muted-foreground/30 text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 text-[#1A1A1A] font-semibold hover:brightness-90"
              style={{ backgroundColor: '#CCF725' }}
            >
              Confirmar parceria
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
