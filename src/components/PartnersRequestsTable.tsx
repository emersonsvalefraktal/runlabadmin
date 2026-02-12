import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { usePermissions } from "@/hooks/usePermissions";
import { AceitarParceiroDialog } from "@/components/AceitarParceiroDialog";
import { RecusarParceiroDialog } from "@/components/RecusarParceiroDialog";
import { useState } from "react";

interface PartnerRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  type: string;
  requestDate: string;
}

const partnerRequests: PartnerRequest[] = [
  {
    id: 1,
    name: "Ana Clara Silva",
    email: "anacsilva@gmail.com",
    phone: "(00) 9783-4311",
    cpfCnpj: "123.456.789-99",
    type: "Assessoria",
    requestDate: "01/09/2025 16:30",
  },
  {
    id: 2,
    name: "João Pedro Almeida",
    email: "joaopedro@gmail.com",
    phone: "(11) 9183-4415",
    cpfCnpj: "123.456.789-99",
    type: "Assessoria",
    requestDate: "01/09/2025 16:30",
  },
  {
    id: 3,
    name: "Fernanda Ribeiro",
    email: "fernandarib@gmail.com",
    phone: "(11) 9744-4311",
    cpfCnpj: "123.456.789-99",
    type: "Assessoria",
    requestDate: "01/09/2025 16:30",
  },
  {
    id: 4,
    name: "Carlos Martins",
    email: "carlosmartins@gmail.com",
    phone: "(11) 9283-4415",
    cpfCnpj: "123.456.789-99",
    type: "Assessoria",
    requestDate: "01/09/2025 16:30",
  },
  {
    id: 5,
    name: "Tatiane Lima",
    email: "tatianelima@gmail.com",
    phone: "(00) 9783-4311",
    cpfCnpj: "123.456.789-99",
    type: "Assessoria",
    requestDate: "01/09/2025 16:30",
  },
  {
    id: 6,
    name: "Ricardo Gomes",
    email: "ricardogomes@gmail.com",
    phone: "(11) 9783-4311",
    cpfCnpj: "123.456.789-99",
    type: "Assessoria",
    requestDate: "01/09/2025 16:30",
  },
  {
    id: 7,
    name: "Patricia Almeida",
    email: "patriciaalmeida@gmail.com",
    phone: "(11) 9744-4311",
    cpfCnpj: "123.456.789-99",
    type: "Assessoria",
    requestDate: "01/09/2025 16:30",
  },
  {
    id: 8,
    name: "Luiz Henrique",
    email: "luizhenrique@gmail.com",
    phone: "(11) 9783-4314",
    cpfCnpj: "123.456.789-99",
    type: "Assessoria",
    requestDate: "01/09/2025 16:30",
  },
];

export const PartnersRequestsTable = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const canApprovePartners = hasPermission("usuarios.approve_partners");
  const [isAceitarDialogOpen, setIsAceitarDialogOpen] = useState(false);
  const [isRecusarDialogOpen, setIsRecusarDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<{ id: number; name: string } | null>(null);

  const handleAccept = (e: React.MouseEvent, id: number, name: string) => {
    e.stopPropagation();
    setSelectedPartner({ id, name });
    setIsAceitarDialogOpen(true);
  };

  const handleConfirmAccept = (dataInicio?: Date, dataFim?: Date) => {
    if (selectedPartner) {
      toast.success(`Solicitação de ${selectedPartner.name} aceita com sucesso!`);
      // Implementar lógica de aceitar solicitação com as datas
      console.log("Data início:", dataInicio);
      console.log("Data fim:", dataFim);
    }
  };

  const handleReject = (e: React.MouseEvent, id: number, name: string) => {
    e.stopPropagation();
    setSelectedPartner({ id, name });
    setIsRecusarDialogOpen(true);
  };

  const handleConfirmReject = (motivo: string) => {
    if (selectedPartner) {
      toast.error(`Solicitação de ${selectedPartner.name} recusada.`);
      // Implementar lógica de recusar solicitação com o motivo
      console.log("Motivo da recusa:", motivo);
    }
  };

  return (
    <>
      <div className="bg-card rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-table-title">
          <h3 className="text-foreground font-semibold">Solicitações de novos parceiros</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-table-header">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Nome</th>
                <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>E-mail</th>
                <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Telefone</th>
                <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>CPF/CNPJ</th>
                <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Tipo de parceiro</th>
                <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Data de solicitação</th>
                <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Solicitações</th>
              </tr>
            </thead>
            <tbody>
              {partnerRequests.map((request, index) => (
                <tr
                  key={request.id}
                  onClick={() => navigate(`/parceiros/${request.id}`)}
                  className={`border-t border-border hover:bg-table-row-hover transition-colors cursor-pointer ${
                    index % 2 === 0 ? "bg-table-row" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-foreground">{request.name}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{request.email}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{request.phone}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{request.cpfCnpj}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{request.type}</td>
                  <td className="px-6 py-4 text-sm text-foreground whitespace-nowrap">{request.requestDate}</td>
                  <td className="px-6 py-4">
                    {canApprovePartners ? (
                      <div className="flex flex-col gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => handleAccept(e, request.id, request.name)}
                          className="h-7 text-xs border-success text-success hover:bg-success/10"
                        >
                          Aceitar
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => handleReject(e, request.id, request.name)}
                          className="h-7 text-xs bg-[#1A1A1A] text-foreground hover:bg-[#252525] hover:text-foreground"
                        >
                          Recusar
                        </Button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Aceitar Parceiro Dialog */}
      <AceitarParceiroDialog
        open={isAceitarDialogOpen}
        onOpenChange={setIsAceitarDialogOpen}
        parceiroNome={selectedPartner?.name}
        onConfirm={handleConfirmAccept}
      />

      {/* Recusar Parceiro Dialog */}
      <RecusarParceiroDialog
        open={isRecusarDialogOpen}
        onOpenChange={setIsRecusarDialogOpen}
        parceiroNome={selectedPartner?.name}
        onConfirm={handleConfirmReject}
      />
    </>
  );
};
