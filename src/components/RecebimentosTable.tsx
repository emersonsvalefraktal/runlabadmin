import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockData = [
  {
    id: "8901234",
    nome: "Patricia Gomes",
    recebimento: "Assinatura",
    competicao: "Meia Maratona",
    valor: "R$150,00",
    data: "20/02/26",
    pagamento: "Crédito",
    status: "em_aberto"
  },
  {
    id: "5678901",
    nome: "Carlos Alberto",
    recebimento: "Inscrição",
    competicao: "Desafio 5km",
    valor: "R$89,90",
    data: "05/11/25",
    pagamento: "Pix",
    status: "pago"
  },
  {
    id: "0123456",
    nome: "Juliana Almeida",
    recebimento: "Inscrição",
    competicao: "Desafio 5km",
    valor: "R$150,00",
    data: "18/04/26",
    pagamento: "Crédito",
    status: "vencido"
  },
  {
    id: "4567890",
    nome: "Fernanda Lima",
    recebimento: "Inscrição",
    competicao: "Maratona 10km",
    valor: "R$89,90",
    data: "10/10/25",
    pagamento: "Débito",
    status: "vencido"
  },
  {
    id: "2345678",
    nome: "Maria Ana Souza",
    recebimento: "Inscrição",
    competicao: "Maratona 10km",
    valor: "R$150,00",
    data: "15/08/25",
    pagamento: "Débito",
    status: "pago"
  },
  {
    id: "7890123",
    nome: "Roberto Carlos",
    recebimento: "Assinatura",
    competicao: "Maratona 42km",
    valor: "R$89,90",
    data: "12/01/26",
    pagamento: "Débito",
    status: "pago"
  },
  {
    id: "6789012",
    nome: "Ana Beatriz",
    recebimento: "Assinatura",
    competicao: "Correr 5km",
    valor: "R$89,90",
    data: "30/12/25",
    pagamento: "Crédito",
    status: "pago"
  },
  {
    id: "9012345",
    nome: "Gustavo Santos",
    recebimento: "Assinatura",
    competicao: "Ultra Trail",
    valor: "R$89,90",
    data: "11/03/26",
    pagamento: "Pix",
    status: "pago"
  },
  {
    id: "3456789",
    nome: "Persio Dantas",
    recebimento: "Assinatura",
    competicao: "Ultra Trail",
    valor: "R$150,00",
    data: "22/09/25",
    pagamento: "Débito",
    status: "pago"
  },
  {
    id: "1234567",
    nome: "Maria Flávia",
    recebimento: "Inscrição",
    competicao: "Desafio 5km",
    valor: "R$129,00",
    data: "01/07/25",
    pagamento: "Débito",
    status: "pago"
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pago":
      return <Badge className="bg-success/20 text-success-foreground hover:bg-success/20">Pago</Badge>;
    case "em_aberto":
      return <Badge className="bg-muted text-foreground hover:bg-muted">Em aberto</Badge>;
    case "vencido":
      return <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/20">Vencido</Badge>;
    default:
      return null;
  }
};

export const RecebimentosTable = () => {
  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <div className="px-6 py-4 bg-[#262626]">
        <h2 className="text-xl font-semibold text-foreground">Recebimentos de usuários</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-table-header hover:bg-table-header">
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>ID</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Nome</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Recebimento</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Competição</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Valor</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Data</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Pagamento</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((row, index) => (
            <TableRow 
              key={index}
              className="bg-table-row hover:bg-table-row-hover"
            >
              <TableCell className="text-foreground">{row.id}</TableCell>
              <TableCell className="text-foreground">{row.nome}</TableCell>
              <TableCell className="text-foreground">{row.recebimento}</TableCell>
              <TableCell className="text-foreground">{row.competicao}</TableCell>
              <TableCell className="text-foreground">{row.valor}</TableCell>
              <TableCell className="text-foreground">{row.data}</TableCell>
              <TableCell className="text-foreground">{row.pagamento}</TableCell>
              <TableCell>{getStatusBadge(row.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
