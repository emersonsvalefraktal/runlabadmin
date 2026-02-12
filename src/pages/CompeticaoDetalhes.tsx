import { useState } from "react";
import { Header } from "@/components/Header";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";
import { ChevronLeft, ChevronRight, Pencil, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/Pagination";
import { ExportDialog } from "@/components/ExportDialog";
import { InscricoesFilterDialog } from "@/components/InscricoesFilterDialog";
import { CompeticaoDetalheTabProvider, CompeticaoDetalheTabs, useCompeticaoDetalheTab } from "@/components/CompeticaoDetalheTabs";
import competitionHero from "@/assets/competition-hero.png";

const mockRanking = [
  { posicao: "1º", corredor: "Beatriz Vieira", avatar: "/placeholder.svg", pace: "5min/km", distancia: "5.21km" },
  { posicao: "2º", corredor: "Lucas Silva", avatar: "/placeholder.svg", pace: "5min/km", distancia: "5.21km" },
  { posicao: "3º", corredor: "Mariana Costa", avatar: "/placeholder.svg", pace: "5min/km", distancia: "5.21km" },
  { posicao: "4º", corredor: "Thiago Santos", avatar: "/placeholder.svg", pace: "5min/km", distancia: "5.21km" },
  { posicao: "5º", corredor: "Ana Paula", avatar: "/placeholder.svg", pace: "5min/km", distancia: "5.21km" },
  { posicao: "6º", corredor: "Gabriel Almeida", avatar: "/placeholder.svg", pace: "5min/km", distancia: "5.21km" },
  { posicao: "7º", corredor: "Fernanda Oliveira", avatar: "/placeholder.svg", pace: "5min/km", distancia: "5.21km" },
  { posicao: "8º", corredor: "Rafael Martins", avatar: "/placeholder.svg", pace: "5min/km", distancia: "5.21km" },
  { posicao: "9º", corredor: "Juliana Pereira", avatar: "/placeholder.svg", pace: "5min/km", distancia: "5.21km" },
  { posicao: "10º", corredor: "Sofia Lima", avatar: "/placeholder.svg", pace: "5min/km", distancia: "5.21km" },
];

const mockInscricoes = [
  { id: "ID", nome: "Beatriz Vieira", telefone: "(11) 98705-4321", tentativas: 1, valor: "R$ 69,00", status: "Suporte" },
  { id: "#01", nome: "Beatriz Vieira", telefone: "(11) 98876-6432", tentativas: 4, valor: "R$ 69,00", status: "Suporte" },
  { id: "#02", nome: "Beatriz Vieira", telefone: "(11) 99987-6543", tentativas: 2, valor: "R$ 120,00", status: "Aguardando" },
  { id: "#03", nome: "Beatriz Vieira", telefone: "(11) 97765-4321", tentativas: 3, valor: "R$ 54,00", status: "Aguardando" },
  { id: "#04", nome: "Beatriz Vieira", telefone: "(11) 96654-3210", tentativas: 1, valor: "R$ 76,00", status: "Concluído" },
  { id: "#05", nome: "Beatriz Vieira", telefone: "(11) 95543-2109", tentativas: 2, valor: "R$ 45,00", status: "Concluído" },
  { id: "#06", nome: "Beatriz Vieira", telefone: "(11) 94432-1098", tentativas: 3, valor: "R$ 30,00", status: "Concluído" },
  { id: "#07", nome: "Beatriz Vieira", telefone: "(11) 93321-0987", tentativas: 2, valor: "R$ 100,00", status: "Concluído" },
  { id: "#08", nome: "Beatriz Vieira", telefone: "(11) 92210-9876", tentativas: 4, valor: "R$ 60,00", status: "Concluído" },
  { id: "#09", nome: "Beatriz Vieira", telefone: "(11) 91100-8765", tentativas: 4, valor: "R$ 80,00", status: "Concluído" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Suporte":
      return (
        <Badge className="bg-red-500/20 text-red-400 border-0 hover:bg-red-500/20 px-4 py-1 rounded-full">
          Suporte
        </Badge>
      );
    case "Aguardando":
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-0 hover:bg-yellow-500/20 px-4 py-1 rounded-full">
          Aguardando
        </Badge>
      );
    case "Concluído":
      return (
        <Badge className="bg-green-500/20 text-green-400 border-0 hover:bg-green-500/20 px-4 py-1 rounded-full">
          Concluído
        </Badge>
      );
    default:
      return null;
  }
};

const CompeticaoDetalheContent = () => {
  const { activeTab } = useCompeticaoDetalheTab();

  if (activeTab === "inscricoes") {
    return (
      <>
        <div className="rounded-lg overflow-hidden border border-border mb-6">
          <div className="px-6 py-4 bg-[#262626] flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Inscritos</h2>
            <p className="text-sm text-muted-foreground">100 inscritos</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header hover:bg-table-header">
                <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>ID</TableHead>
                <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Nome</TableHead>
                <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Telefone</TableHead>
                <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Número de tentativas</TableHead>
                <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Valor</TableHead>
                <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInscricoes.map((inscricao, index) => (
                <TableRow 
                  key={index}
                  className="border-border hover:bg-muted/50 bg-[#262626]"
                >
                  <TableCell className="text-foreground">{inscricao.id}</TableCell>
                  <TableCell className="font-medium text-foreground">{inscricao.nome}</TableCell>
                  <TableCell className="text-foreground">{inscricao.telefone}</TableCell>
                  <TableCell className="text-foreground text-center">{inscricao.tentativas}</TableCell>
                  <TableCell className="text-foreground">{inscricao.valor}</TableCell>
                  <TableCell>{getStatusBadge(inscricao.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination />
      </>
    );
  }

  if (activeTab === "ranking") {
    return (
      <>
        <div className="rounded-lg overflow-hidden border border-border mb-6">
          <div className="px-6 py-4 bg-[#262626]">
            <h2 className="text-xl font-semibold text-foreground">Ranking atual</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-table-header hover:bg-table-header">
                <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Posição</TableHead>
                <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Corredor</TableHead>
                <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Pace</TableHead>
                <TableHead className="font-medium" style={{ color: '#E0E0E0' }}>Distância</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRanking.map((item, index) => (
                <TableRow 
                  key={index}
                  className="border-border hover:bg-muted/50 bg-[#262626]"
                >
                  <TableCell className="text-foreground">{item.posicao}</TableCell>
                  <TableCell className="font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                        <img src={item.avatar} alt={item.corredor} className="w-full h-full object-cover" />
                      </div>
                      {item.corredor}
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{item.pace}</TableCell>
                  <TableCell className="text-foreground">{item.distancia}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination />
      </>
    );
  }

  return (
    <>
      {/* Hero Image */}
      <div className="mb-8 rounded-lg overflow-hidden">
        <img src={competitionHero} alt="Competição" className="w-full h-[380px] object-cover" />
      </div>

      {/* Estatísticas */}
      <div className="mb-8 bg-[#262626] rounded-lg p-6">
        <h2 className="text-lg font-medium text-foreground mb-4">Estatísticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#1A1A1A] border-0">
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground mb-2">Total de inscritos</p>
              <p className="text-2xl font-semibold text-foreground">100 atletas</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1A1A1A] border-0">
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground mb-2">Total de inscrições</p>
              <p className="text-2xl font-semibold text-foreground">120 inscrições</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1A1A1A] border-0">
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground mb-2">Total em vendas</p>
              <p className="text-2xl font-semibold text-foreground">R$ 15.000,00</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="bg-[#1A1A1A] border-0">
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground mb-2">Total em repasses</p>
              <p className="text-2xl font-semibold text-foreground">R$ 12.000,00</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1A1A1A] border-0">
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground mb-2">Valor líquido</p>
              <p className="text-2xl font-semibold text-success">R$ 3.000,00</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dados da competição */}
      <div className="mb-8 bg-[#262626] rounded-lg p-6">
        <h2 className="text-lg font-medium text-foreground mb-4">Dados da competição</h2>
        <Card className="bg-[#1A1A1A] border-0 mb-4">
          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">DESAFIO 5KM</h3>
              <p className="text-sm text-foreground">PARQUE IBIRAPUERA</p>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-2">Descrição</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Prepare-se para o Desafio de sábado no Parque Ibirapuera! Treino de 5km em ritmo descontraído para fortalecer a resistência e compartilhar energia com a comunidade de corredores.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#1A1A1A] border-0">
            <CardContent className="p-6 space-y-6 divide-y divide-border">
              <div className="pt-0">
                <p className="text-xs text-muted-foreground mb-2">Período de inscrições</p>
                <p className="text-base font-medium text-foreground">14 - 18 setembro, 2025</p>
              </div>
              
              <div className="pt-6">
                <p className="text-xs text-muted-foreground mb-2">Período da competição</p>
                <p className="text-base font-medium text-foreground">21 - 25 setembro, 2025</p>
              </div>
              
              <div className="pt-6">
                <p className="text-xs text-muted-foreground mb-2">Modalidade</p>
                <p className="text-base font-medium text-foreground">Corrida outdoor</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1A1A1A] border-0">
            <CardContent className="p-6 space-y-6 divide-y divide-border">
              <div className="pt-0">
                <p className="text-xs text-muted-foreground mb-2">Distância</p>
                <p className="text-base font-medium text-foreground">De 3km a 5km</p>
              </div>
              
              <div className="pt-6">
                <p className="text-xs text-muted-foreground mb-2">Tipo de premiação</p>
                <p className="text-base font-medium text-foreground">Badge da competição</p>
              </div>
              
              <div className="pt-6">
                <p className="text-xs text-muted-foreground mb-2">Oferece kit?</p>
                <p className="text-base font-medium text-foreground">Sim, para todos os atletas</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Valores */}
      <div className="mb-8 bg-[#262626] rounded-lg p-6">
        <h2 className="text-lg font-medium text-muted-foreground mb-4">Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#1A1A1A] border-0">
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground mb-2">Pré-inscrição atletas gerentes</p>
              <p className="text-2xl font-semibold text-foreground">R$ 69,00</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1A1A1A] border-0">
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground mb-2">Pré-inscrição atletas parcelas</p>
              <p className="text-2xl font-semibold text-foreground">R$ 85,00</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Patrocinadores */}
      <div className="mb-8 bg-[#262626] rounded-lg p-6">
        <h2 className="text-lg font-medium text-foreground mb-4">Patrocinadores</h2>
        <Card className="bg-[#1A1A1A] border-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((num) => (
                <div key={num}>
                  <p className="text-sm text-foreground">Patrocinador {num}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documentos */}
      <div className="mb-8 bg-[#262626] rounded-lg p-6">
        <h2 className="text-lg font-medium text-muted-foreground mb-4">Documentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#1A1A1A] border-0 hover:bg-[#222222] transition-colors cursor-pointer">
            <CardContent className="p-6 flex items-center justify-between">
              <p className="text-sm" style={{ color: '#CCF725' }}>Estatuto</p>
              <Download className="w-5 h-5" style={{ color: '#CCF725' }} />
            </CardContent>
          </Card>
          
          <Card className="bg-[#1A1A1A] border-0 hover:bg-[#222222] transition-colors cursor-pointer">
            <CardContent className="p-6 flex items-center justify-between">
              <p className="text-sm" style={{ color: '#CCF725' }}>Regulamento da campeona</p>
              <Download className="w-5 h-5" style={{ color: '#CCF725' }} />
            </CardContent>
          </Card>
          
          <Card className="bg-[#1A1A1A] border-0 hover:bg-[#222222] transition-colors cursor-pointer">
            <CardContent className="p-6 flex items-center justify-between">
              <p className="text-sm" style={{ color: '#CCF725' }}>Personalizada</p>
              <Download className="w-5 h-5" style={{ color: '#CCF725' }} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

const CompeticaoDetalhesContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const { activeTab } = useCompeticaoDetalheTab();
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  // Mock data - replace with actual API call
  const competicao = {
    id,
    nome: "Desafio 5km"
  };

  return (
    <main className="container mx-auto px-6 py-8 pt-24">
      {/* Back Button and Action Buttons */}
      <div className="mt-16 mb-8 flex items-center justify-between">
        <Link to="/gestao-competicoes">
          <Button 
            className="gap-2 border-0 hover:brightness-90 transition-all" 
            style={{ backgroundColor: '#1A1A1A', color: '#CCF725' }}
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </Button>
        </Link>
        
        <div className="flex gap-3">
          {activeTab === "inscricoes" ? (
              <>
                <Button 
                  className="gap-2 border-0 hover:brightness-90 transition-all" 
                  style={{ backgroundColor: '#1A1A1A', color: '#CCF725' }}
                  onClick={() => setIsFilterDialogOpen(true)}
                >
                  <Filter className="w-4 h-4" />
                  Filtrar
                </Button>
              <Button 
                className="gap-2 border-0 hover:brightness-90 transition-all" 
                style={{ backgroundColor: '#1A1A1A', color: '#CCF725' }}
                onClick={() => setIsExportDialogOpen(true)}
              >
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </>
          ) : activeTab === "ranking" ? (
            <Button 
              className="gap-2 border-0 hover:brightness-90 transition-all" 
              style={{ backgroundColor: '#1A1A1A', color: '#CCF725' }}
              onClick={() => setIsExportDialogOpen(true)}
            >
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          ) : hasPermission("competicoes.edit") ? (
            <Button 
              className="gap-2 border-0 hover:brightness-90 transition-all" 
              style={{ backgroundColor: '#1A1A1A', color: '#CCF725' }}
              onClick={() => navigate(`/gestao-competicoes/${id}/editar`)}
            >
              <Pencil className="w-4 h-4" />
              Editar dados
            </Button>
          ) : null}
        </div>
      </div>

      {/* Breadcrumb - Only visible on Detalhes tab */}
      {activeTab === "detalhes" && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 py-2.5">
          <Link to="/gestao-competicoes" className="hover:text-foreground">
            Competições
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{competicao.nome}</span>
        </div>
      )}

      {/* Tabs */}
      <CompeticaoDetalheTabs />
      <CompeticaoDetalheContent />

      {/* Dialogs */}
      <ExportDialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen} />
      <InscricoesFilterDialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen} />
    </main>
  );
};

const CompeticaoDetalhes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <CompeticaoDetalheTabProvider>
        <CompeticaoDetalhesContent />
      </CompeticaoDetalheTabProvider>
    </div>
  );
};

export default CompeticaoDetalhes;
