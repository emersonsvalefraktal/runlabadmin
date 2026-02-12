import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface RepasseDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  repasse: {
    nome: string;
    tipoParceiro: string;
    repasses: string;
    ultimoRepasse: string;
    status: string;
  } | null;
}

const mockComissoes = [
  {
    data: "25/09/2025",
    competicao: "Ultra Trail",
    valor: "R$ 500,00"
  },
  {
    data: "15/09/2025",
    competicao: "Circuito de Corrida",
    valor: "R$ 400,00"
  },
  {
    data: "13/09/2025",
    competicao: "Corrida das Estações",
    valor: "R$ 600,00"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pago":
      return <Badge className="bg-success/20 text-success-foreground hover:bg-success/20">Pago</Badge>;
    case "em_processamento":
      return <Badge className="bg-muted text-foreground hover:bg-muted">Em processamento</Badge>;
    case "erro":
      return <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/20">Erro</Badge>;
    default:
      return null;
  }
};

export const RepasseDetailsDialog = ({ open, onOpenChange, repasse }: RepasseDetailsDialogProps) => {
  if (!repasse) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1E1E1E] border-0 sm:max-w-[600px]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            {getStatusBadge(repasse.status)}
          </div>

          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-foreground">
              {repasse.nome} <span className="text-muted-foreground">• {repasse.tipoParceiro}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {mockComissoes.map((comissao, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm text-muted-foreground">{comissao.data}</p>
                  <p className="text-foreground">{comissao.competicao}</p>
                </div>
                <p className="text-foreground font-medium">{comissao.valor}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between bg-[#1A1A1A] py-3 px-4 rounded-lg">
              <p className="text-[#D4FF00] font-medium">Total de comissões:</p>
              <p className="text-[#D4FF00] font-bold text-xl">{repasse.repasses}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
