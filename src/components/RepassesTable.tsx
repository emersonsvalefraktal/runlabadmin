import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RepasseDetailsDialog } from "@/components/RepasseDetailsDialog";
import { useState } from "react";

const mockData = [
  {
    nome: "Smart Fit",
    tipoParceiro: "Academia",
    repasses: "R$1.500,00",
    ultimoRepasse: "01/10/25",
    status: "em_processamento"
  },
  {
    nome: "Pratique",
    tipoParceiro: "Academia",
    repasses: "R$1.240,00",
    ultimoRepasse: "01/09/25",
    status: "em_processamento"
  },
  {
    nome: "Carla Guedes",
    tipoParceiro: "Treinador",
    repasses: "R$1.240,00",
    ultimoRepasse: "01/08/25",
    status: "erro"
  },
  {
    nome: "João Dantas",
    tipoParceiro: "Treinador",
    repasses: "R$1.500,00",
    ultimoRepasse: "01/07/25",
    status: "pago"
  },
  {
    nome: "Fernando Dantas",
    tipoParceiro: "Influenciador",
    repasses: "R$1.240,00",
    ultimoRepasse: "01/06/25",
    status: "pago"
  },
  {
    nome: "Patrick Porto",
    tipoParceiro: "Influenciador",
    repasses: "R$1.390,00",
    ultimoRepasse: "01/05/25",
    status: "pago"
  },
  {
    nome: "Pratique",
    tipoParceiro: "Assessoria",
    repasses: "R$1.390,00",
    ultimoRepasse: "01/04/25",
    status: "pago"
  },
  {
    nome: "Pratique",
    tipoParceiro: "Assessoria",
    repasses: "R$1.540,00",
    ultimoRepasse: "01/03/25",
    status: "pago"
  },
  {
    nome: "Bruna Silva",
    tipoParceiro: "Influenciador",
    repasses: "R$1.390,00",
    ultimoRepasse: "01/02/25",
    status: "pago"
  },
  {
    nome: "Life Pro",
    tipoParceiro: "Academia",
    repasses: "R$1.540,00",
    ultimoRepasse: "01/01/25",
    status: "pago"
  },
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

export const RepassesTable = () => {
  const [selectedRepasse, setSelectedRepasse] = useState<typeof mockData[0] | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const handleRowClick = (repasse: typeof mockData[0]) => {
    setSelectedRepasse(repasse);
    setDetailsDialogOpen(true);
  };

  return (
    <>
    <div className="rounded-lg overflow-hidden border border-border">
      <div className="px-6 py-4 bg-[#262626]">
        <h2 className="text-xl font-semibold text-foreground">Repasses para parceiros</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-table-header hover:bg-table-header">
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Nome</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Tipo de parceiro</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Repasses</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Último repasse</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((row, index) => (
            <TableRow 
              key={index}
              className="bg-table-row hover:bg-table-row-hover cursor-pointer"
              onClick={() => handleRowClick(row)}
            >
              <TableCell className="text-foreground">{row.nome}</TableCell>
              <TableCell className="text-foreground">{row.tipoParceiro}</TableCell>
              <TableCell className="text-foreground">{row.repasses}</TableCell>
              <TableCell className="text-foreground">{row.ultimoRepasse}</TableCell>
              <TableCell>{getStatusBadge(row.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    <RepasseDetailsDialog 
      open={detailsDialogOpen} 
      onOpenChange={setDetailsDialogOpen}
      repasse={selectedRepasse}
    />
    </>
  );
};
