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
import { MoreVertical, Pencil, Trash2, RefreshCw, XCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { toast } from "@/hooks/use-toast";

const mockData = [
  {
    id: "COMP001",
    nome: "Desafio 5km",
    modalidade: "Indoor",
    prazoInscricoes: "14 - 18 julho, 25",
    prazoProva: "24 - 30 julho, 25",
    inscritos: 100,
    tipo: "Gratuita",
    formato: "Oficial",
    campeonato: "Camp/25",
    status: "finalizada",
  },
  {
    id: "COMP002",
    nome: "Desafio 10km",
    modalidade: "Outdoor",
    prazoInscricoes: "21 - 25 agosto, 25",
    prazoProva: "24 - 30 julho, 25",
    inscritos: 150,
    tipo: "Paga",
    formato: "Patrocinada",
    campeonato: "Camp/50",
    status: "aberta",
  },
  {
    id: "COMP003",
    nome: "Maratona 42km",
    modalidade: "Indoor",
    prazoInscricoes: "21 - 25 agosto, 25",
    prazoProva: "25 - 30 agosto, 25",
    inscritos: 200,
    tipo: "Paga",
    formato: "Oficial",
    campeonato: "Camp/100",
    status: "aberta",
  },
  {
    id: "COMP004",
    nome: "Circuito 5km",
    modalidade: "Indoor",
    prazoInscricoes: "21 - 25 agosto, 25",
    prazoProva: "25 - 30 agosto, 25",
    inscritos: 75,
    tipo: "Paga",
    formato: "Patrocinada",
    campeonato: "Camp/10",
    status: "aberta",
  },
  {
    id: "COMP005",
    nome: "Desafio 10km",
    modalidade: "Outdoor",
    prazoInscricoes: "21 - 25 agosto, 25",
    prazoProva: "25 - 30 agosto, 25",
    inscritos: 150,
    tipo: "Gratuita",
    formato: "Oficial",
    campeonato: "Camp/30",
    status: "aberta",
  },
  {
    id: "COMP006",
    nome: "Desafio 15km",
    modalidade: "Indoor",
    prazoInscricoes: "21 - 25 agosto, 25",
    prazoProva: "25 - 30 agosto, 25",
    inscritos: 200,
    tipo: "Paga",
    formato: "Oficial",
    campeonato: "Camp/35",
    status: "em_andamento",
  },
  {
    id: "COMP007",
    nome: "Desafio 20km",
    modalidade: "Indoor",
    prazoInscricoes: "21 - 25 agosto, 25",
    prazoProva: "25 - 30 agosto, 25",
    inscritos: 250,
    tipo: "Paga",
    formato: "Patrocinada",
    campeonato: "Camp/40",
    status: "em_andamento",
  },
  {
    id: "COMP008",
    nome: "Desafio 25km",
    modalidade: "Outdoor",
    prazoInscricoes: "21 - 25 agosto, 25",
    prazoProva: "25 - 30 agosto, 25",
    inscritos: 300,
    tipo: "Gratuita",
    formato: "Oficial",
    campeonato: "Camp/45",
    status: "em_andamento",
  },
  {
    id: "COMP009",
    nome: "Desafio 30km",
    modalidade: "Indoor",
    prazoInscricoes: "21 - 25 agosto, 25",
    prazoProva: "25 - 30 agosto, 25",
    inscritos: 350,
    tipo: "Paga",
    formato: "Patrocinada",
    campeonato: "Camp/50",
    status: "em_andamento",
  },
  {
    id: "COMP010",
    nome: "Desafio 42km",
    modalidade: "Outdoor",
    prazoInscricoes: "21 - 25 agosto, 25",
    prazoProva: "25 - 30 agosto, 25",
    inscritos: 400,
    tipo: "Gratuita",
    formato: "Oficial",
    campeonato: "Camp/55",
    status: "em_andamento",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "finalizada":
      return (
        <Badge variant="outline" className="bg-muted/10 text-muted-foreground border-muted">
          Finalizada
        </Badge>
      );
    case "em_andamento":
      return (
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Em andamento
        </Badge>
      );
    case "aberta":
      return (
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          Aberta
        </Badge>
      );
    default:
      return null;
  }
};

export const CompeticoesTable = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = () => {
    console.log("Excluindo:", selectedItem);
    toast({
      title: "Competição excluída com sucesso!",
      duration: 3000,
    });
    setDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <div className="px-6 py-4 bg-[#262626]">
        <h2 className="text-xl font-semibold text-foreground">Competições</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-table-header hover:bg-table-header">
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Nome</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Modalidade</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Prazo Inscrições</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Prazo prova</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Inscritos</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Tipo</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Formato</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Campeonato</TableHead>
            <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Status</TableHead>
            <TableHead className="font-medium w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((row, index) => (
            <TableRow 
              key={index}
              onClick={() => navigate(`/gestao-competicoes/${row.id}`)}
              className="border-border hover:bg-muted/50 cursor-pointer transition-colors bg-[#262626]"
            >
              <TableCell className="text-foreground">{row.nome}</TableCell>
              <TableCell className="text-foreground">{row.modalidade}</TableCell>
              <TableCell className="text-foreground">{row.prazoInscricoes}</TableCell>
              <TableCell className="text-foreground">{row.prazoProva}</TableCell>
              <TableCell className="text-foreground">{row.inscritos}</TableCell>
              <TableCell className="text-foreground">{row.tipo}</TableCell>
              <TableCell className="text-foreground">{row.formato}</TableCell>
              <TableCell className="text-foreground">{row.campeonato}</TableCell>
              <TableCell>{getStatusBadge(row.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 border-0 p-6 bg-[#262626] space-y-2" style={{ boxShadow: '0 4px 12px 0 #00000026' }}>
                    {hasPermission("competicoes.edit") && (
                      <DropdownMenuItem
                        className="cursor-pointer py-3 px-3 rounded-md hover:bg-[#1A1A1A] border border-transparent hover:border-border/50 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/gestao-competicoes/${row.id}/editar`);
                        }}
                      >
                        <Pencil className="h-4 w-4 mr-3" />
                        Editar
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      className="cursor-pointer py-3 px-3 rounded-md hover:bg-[#1A1A1A] border border-transparent hover:border-border/50 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(row.nome);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-3" />
                      Excluir
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer py-3 px-3 rounded-md hover:bg-[#1A1A1A] border border-transparent hover:border-border/50 transition-all">
                      <RefreshCw className="h-4 w-4 mr-3" />
                      Ativar/desativar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer py-3 px-3 rounded-md hover:bg-[#1A1A1A] border border-transparent hover:border-border/50 transition-all">
                      <XCircle className="h-4 w-4 mr-3" />
                      Encerrar manualmente
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#3A3A3A] border-0 text-foreground max-w-md">
          <button 
            onClick={() => setDeleteDialogOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-foreground">
              Deseja excluir esta competição?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Tem certeza de que deseja excluir este competição? Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel 
              className="bg-transparent border border-border text-foreground hover:bg-muted"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Excluir usuário
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
