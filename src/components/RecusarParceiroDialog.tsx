import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";
interface RecusarParceiroDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (motivo: string) => void;
  parceiroNome?: string;
}
export const RecusarParceiroDialog = ({
  open,
  onOpenChange,
  onConfirm,
  parceiroNome
}: RecusarParceiroDialogProps) => {
  const [motivo, setMotivo] = useState("");
  const maxLength = 200;
  const handleConfirm = () => {
    if (motivo.trim()) {
      onConfirm(motivo);
      setMotivo("");
      onOpenChange(false);
    }
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2a2a2a] border-0 sm:max-w-[600px] p-8">
        {/* Close Button */}
        <button onClick={() => onOpenChange(false)} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Close</span>
        </button>

        {/* Content */}
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              Recusar solicitação de parceria
            </h2>
            <p className="text-sm text-foreground">
              Confirme abaixo o motivo da recusa. Essa informação será registrada e enviada ao parceiro.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Motivo Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1">
              <span style={{
              color: '#CCF725'
            }}>★</span>
              Motivo da recusa
            </label>
            <div className="space-y-2">
              <div className="relative">
                <Textarea value={motivo} onChange={e => {
                if (e.target.value.length <= maxLength) {
                  setMotivo(e.target.value);
                }
              }} placeholder="Ex: Documentação incompleta / Não atende aos requisitos de credenciamento" className="min-h-[180px] bg-[#1A1A1A] border-0 text-foreground placeholder:text-muted-foreground resize-none" />
                
              </div>
              <div className="flex justify-end">
                <span className="text-xs text-muted-foreground">
                  {motivo.length}/{maxLength}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => {
            setMotivo("");
            onOpenChange(false);
          }} className="flex-1 bg-transparent border-2 border-muted-foreground/30 text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground">
              Cancelar
            </Button>
            <Button onClick={handleConfirm} disabled={!motivo.trim()} className="flex-1 text-white font-semibold hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed" style={{
            backgroundColor: '#FF5733'
          }}>
              Confirmar recusa
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};