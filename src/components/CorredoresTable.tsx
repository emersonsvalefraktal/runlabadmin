import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const mockData = [
  {
    id: 1,
    nome: "Ana Clara Silva",
    email: "anaclsilva@gmail.com",
    telefone: "(11) 9783-4311",
    preferencia: "Corrida outdoor",
    vinculo: "Corredor",
    ultimoAcesso: "01/09/2025\n16:30",
    plano: "gratuito"
  },
  {
    id: 2,
    nome: "João Pedro Almeida",
    email: "joaopedro@gmail.com",
    telefone: "(11) 9183-4415",
    preferencia: "Corrida indoor",
    vinculo: "Corredor",
    ultimoAcesso: "01/09/2025\n16:30",
    plano: "plus"
  },
  {
    id: 3,
    nome: "Fernanda Ribeiro",
    email: "fernandarib@gmail.com",
    telefone: "(11) 9744-4311",
    preferencia: "Corrida outdoor",
    vinculo: "Corredor/parceiro",
    ultimoAcesso: "01/09/2025\n16:30",
    plano: "essencial"
  },
  {
    id: 4,
    nome: "Carlos Martins",
    email: "carlosmartins@gmail.com",
    telefone: "(11) 9283-4415",
    preferencia: "Corrida indoor",
    vinculo: "Corredor",
    ultimoAcesso: "01/09/2025\n16:30",
    plano: "plus"
  },
  {
    id: 5,
    nome: "Tatiane Lima",
    email: "tatianalima@gmail.com",
    telefone: "(00) 9783-4311",
    preferencia: "Corrida outdoor",
    vinculo: "Corredor/parceiro",
    ultimoAcesso: "01/09/2025\n16:30",
    plano: "essencial"
  },
  {
    id: 6,
    nome: "Ricardo Gomes",
    email: "ricardogmes@gmail.com",
    telefone: "(11) 9783-4311",
    preferencia: "Corrida indoor",
    vinculo: "Corredor",
    ultimoAcesso: "01/09/2025\n16:30",
    plano: "gratuito"
  },
  {
    id: 7,
    nome: "Patricia Almeida",
    email: "patriciaalmeida@gmail.com",
    telefone: "(11) 9744-4311",
    preferencia: "Corrida outdoor",
    vinculo: "Corredor/parceiro",
    ultimoAcesso: "01/09/2025\n16:30",
    plano: "essencial"
  },
  {
    id: 8,
    nome: "Luiz Henrique",
    email: "luizhenrique@gmail.com",
    telefone: "(11) 9783-4312",
    preferencia: "Corrida indoor",
    vinculo: "Corredor/parceiro",
    ultimoAcesso: "01/09/2025\n16:30",
    plano: "essencial"
  },
  {
    id: 9,
    nome: "Lucas Oliveira",
    email: "lucasoliveira@gmail.com",
    telefone: "(11) 9783-4314",
    preferencia: "Corrida outdoor",
    vinculo: "Corredor",
    ultimoAcesso: "01/09/2025\n16:30",
    plano: "plus"
  },
  {
    id: 10,
    nome: "Maria Fernanda",
    email: "mariafernda@gmail.com",
    telefone: "(11) 9744-4311",
    preferencia: "Corrida indoor",
    vinculo: "Corredor",
    ultimoAcesso: "01/09/2025\n16:30",
    plano: "gratuito"
  },
];

const getPlanoBadge = (plano: string) => {
  switch (plano) {
    case "gratuito":
      return <Badge className="bg-success/20 text-success-foreground hover:bg-success/20">Gratuito</Badge>;
    case "plus":
      return <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/20">Plus</Badge>;
    case "essencial":
      return <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/20">Essencial</Badge>;
    default:
      return null;
  }
};

export const CorredoresTable = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <div className="px-6 py-4 bg-[#262626]">
        <h2 className="text-xl font-semibold text-foreground">Corredores</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-table-header hover:bg-table-header">
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Nome</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>E-mail</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Telefone</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Preferência</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Vínculo RunLab</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Último acesso</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Plano</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((corredor, index) => (
            <TableRow 
              key={index} 
              className="border-border hover:bg-muted/50 cursor-pointer bg-[#262626]"
              onClick={() => navigate(`/corredores/${corredor.id}`)}
            >
              <TableCell className="font-medium text-foreground">{corredor.nome}</TableCell>
              <TableCell className="text-foreground">{corredor.email}</TableCell>
              <TableCell className="text-foreground">{corredor.telefone}</TableCell>
              <TableCell className="text-foreground">{corredor.preferencia}</TableCell>
              <TableCell className="text-foreground">{corredor.vinculo}</TableCell>
              <TableCell className="text-foreground whitespace-pre-line">{corredor.ultimoAcesso}</TableCell>
              <TableCell>{getPlanoBadge(corredor.plano)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
