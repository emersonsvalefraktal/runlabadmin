import { useState } from "react";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, X, ChevronLeft } from "lucide-react";
import nivelIcon from "@/assets/nivel-icon.png";
import { Button } from "@/components/ui/button";
import { CorredorProfileDialog } from "@/components/CorredorProfileDialog";
import { InativarParceiroDialog } from "@/components/InativarParceiroDialog";
import { useToast } from "@/hooks/use-toast";

const ParceiroDetalhes = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isInativarDialogOpen, setIsInativarDialogOpen] = useState(false);

  // Mock data - replace with actual API call
  const parceiro = {
    id,
    name: "Ana Clara Silva",
    cnpj: "123.456.789-99",
    email: "contato@runningclub.com.br",
    phone: "(11) 98765-4321",
    cadastro: "15/03/2024",
    city: "São Paulo",
    state: "SP",
    type: "Influenciadora",
    nivel: 10,
    lastAccess: "15/01/2025 • 10:30",
    status: "Ativo",
    avatar: "/placeholder.svg",
    formData: {
      instagram: "@anacsilva",
      link: "@anacsilva",
      telefone: "(99) 99999-9999",
      email: "assessoria@anacsilva.com",
      site: "www.assessoria-anacsilva.com.br",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec lacus nec nisl vestibulum fermentum. Sed gravida orci vel nisl euismod libero sit amet quam scelerisque, eget scelerisque elit tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Morbi non ex ac velit tincidunt bibendum. Pellentesque nec lacus nec nisl vestibulum fermentum. Sed gravida orci vel nisl euismod, vel euismod libero sit amet quam scelerisque, eget scelerisque elit tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Morbi non ex ac velit tincidunt bibendum. Pellentesque nec lacus nec nisl vestibulum fermentum. Sed gravida orci vel nisl euismod, vel euismod libero sit amet quam"
    },
    stats: {
      inscricoes: 156,
      eventos: 12,
      receita: "R$ 45.890,00"
    }
  };

  const inscricoes = [
    {
      evento: "Maratona de São Paulo 2025",
      corredor: "Ana Clara Silva",
      data: "15/03/2025",
      valor: "R$ 250,00",
      status: "Confirmada"
    },
    {
      evento: "Corrida de Rua - 10km",
      corredor: "João Pedro Santos",
      data: "20/02/2025",
      valor: "R$ 80,00",
      status: "Confirmada"
    },
    {
      evento: "Trail Running Challenge",
      corredor: "Maria Fernanda Costa",
      data: "10/02/2025",
      valor: "R$ 150,00",
      status: "Pendente"
    },
    {
      evento: "Meia Maratona Cidade",
      corredor: "Carlos Eduardo Lima",
      data: "05/01/2025",
      valor: "R$ 180,00",
      status: "Confirmada"
    },
    {
      evento: "Corrida Noturna - 5km",
      corredor: "Beatriz Almeida",
      data: "28/12/2024",
      valor: "R$ 60,00",
      status: "Confirmada"
    }
  ];

  const repasses = [
    {
      data: "01/01/2025",
      valor: "R$99,00",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesq...",
      status: "Falha"
    },
    {
      data: "04/02/2025",
      valor: "R$99,00",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesq...",
      status: "Falha"
    },
    {
      data: "01/03/2025",
      valor: "R$99,00",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesq...",
      status: "Concluído"
    },
    {
      data: "01/04/2025",
      valor: "R$99,00",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesq...",
      status: "Concluído"
    },
    {
      data: "01/06/2025",
      valor: "R$99,00",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesq...",
      status: "Concluído"
    },
    {
      data: "01/06/2025",
      valor: "R$99,00",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesq...",
      status: "Concluído"
    },
    {
      data: "01/07/2025",
      valor: "R$99,00",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesq...",
      status: "Concluído"
    },
    {
      data: "01/08/2025",
      valor: "R$99,00",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesq...",
      status: "Concluído"
    },
    {
      data: "01/09/2025",
      valor: "R$90,00",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesq...",
      status: "Concluído"
    },
    {
      data: "01/10/2025",
      valor: "R$99,00",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesq...",
      status: "Concluído"
    },
    {
      data: "01/11/2025",
      valor: "R$99,00",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesq...",
      status: "Concluído"
    },
    {
      data: "01/12/2025",
      valor: "R$99,00",
      descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesq...",
      status: "Concluído"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 pt-24">
        {/* Back Button */}
        <div className="mt-16 mb-6">
          <Link to="/?tab=requests">
            <Button 
              className="gap-2 border-0 hover:brightness-90 transition-all" 
              style={{ backgroundColor: '#1A1A1A', color: '#CCF725' }}
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </Button>
          </Link>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/?tab=requests" className="hover:text-foreground">
            Parceiros
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{parceiro.name}</span>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-foreground/40">Dados do parceiro</h1>
          <Button 
            onClick={() => setIsProfileDialogOpen(true)}
            className="gap-2 border-0 hover:brightness-90 transition-all" 
            style={{ backgroundColor: '#1A1A1A', color: '#CCF725' }}
          >
            Visualizar perfil de corredor
          </Button>
        </div>

        {/* Main Profile Card */}
        <Card className="mb-6 bg-[#2a2a2a] border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="rounded-full bg-[#d4af37] overflow-hidden flex-shrink-0" style={{ width: '140px', height: '140px' }}>
                  <img src={parceiro.avatar} alt={parceiro.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <img src={nivelIcon} alt="Nível" className="w-10 h-10" />
                    <span className="text-sm text-success">NÍVEL {parceiro.nivel}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{parceiro.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    CPF {parceiro.cnpj}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{parceiro.type}</p>
                </div>
              </div>
              <Badge 
                variant="default" 
                className={
                  parceiro.status === "Ativo" 
                    ? "bg-success hover:bg-success" 
                    : "bg-destructive hover:bg-destructive"
                }
              >
                {parceiro.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mb-6 bg-[#2a2a2a] border-0">
          <CardContent className="p-6 space-y-4 divide-y divide-border">
            <div className="pt-0">
              <p className="text-xs text-muted-foreground mb-1">E-mail</p>
              <p className="text-sm text-foreground">{parceiro.email}</p>
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Telefone</p>
              <p className="text-sm text-foreground">{parceiro.phone}</p>
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Último acesso</p>
              <p className="text-sm text-foreground">{parceiro.lastAccess}</p>
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground mb-3">Data de parceria</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1A1A1A] rounded-lg px-4 py-3">
                  <p className="text-sm text-foreground">
                    <span className="text-xs text-muted-foreground">De: </span>{parceiro.cadastro}
                  </p>
                </div>
                <div className="bg-[#1A1A1A] rounded-lg px-4 py-3">
                  <p className="text-sm text-foreground">
                    <span className="text-xs text-muted-foreground">De: </span>01/01/2026
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Data Card */}
        <div className="mb-6">
          <div className="flex justify-end mb-4">
            <Button 
              onClick={() => setIsInativarDialogOpen(true)}
              className="gap-2 border-0 hover:brightness-90 transition-all" 
              style={{ backgroundColor: '#1A1A1A', color: '#808080' }}
            >
              <X className="w-4 h-4" />
              Inativar parceiro
            </Button>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Dados do formulário enviado</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Card */}
            <Card className="bg-[#2a2a2a] border-0">
              <CardContent className="p-6 space-y-4 divide-y divide-border">
                <div className="pt-0">
                  <p className="text-xs text-muted-foreground mb-1">Instagram</p>
                  <p className="text-sm text-foreground">{parceiro.formData.instagram}</p>
                </div>
                <div className="pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Link</p>
                  <p className="text-sm text-foreground">{parceiro.formData.link}</p>
                </div>
                <div className="pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Telefone</p>
                  <p className="text-sm text-foreground">{parceiro.formData.telefone}</p>
                </div>
                <div className="pt-4">
                  <p className="text-xs text-muted-foreground mb-1">E-mail</p>
                  <p className="text-sm text-foreground">{parceiro.formData.email}</p>
                </div>
                <div className="pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Site</p>
                  <p className="text-sm text-foreground">{parceiro.formData.site}</p>
                </div>
              </CardContent>
            </Card>

            {/* Right Card - Description */}
            <Card className="bg-[#2a2a2a] border-0">
              <CardContent className="p-6">
                <p className="text-xs text-muted-foreground mb-2">Descrição</p>
                <p className="text-sm text-foreground leading-relaxed">{parceiro.formData.descricao}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Histórico de participação em competições</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#2a2a2a] border-0">
              <CardContent className="p-6">
                <p className="text-xs text-muted-foreground mb-2">Nº de provas concluídas</p>
                <p className="text-3xl font-bold text-foreground">{parceiro.stats.inscricoes}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2a2a2a] border-0">
              <CardContent className="p-6">
                <p className="text-xs text-muted-foreground mb-2">Nº de tentativas em provas</p>
                <p className="text-3xl font-bold text-foreground">{parceiro.stats.eventos}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2a2a2a] border-0">
              <CardContent className="p-6">
                <p className="text-xs text-muted-foreground mb-2">Total de repasses já recebidos</p>
                <p className="text-3xl font-bold text-foreground">{parceiro.stats.receita}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Repasses Section */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Histórico de repasses</h2>
          <Card className="bg-card border-0 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-table-header">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Data de repasse</th>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Valor</th>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Descrição resumida financeiro</th>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {repasses.map((repasse, index) => (
                    <tr
                      key={index}
                      className={`border-t border-border ${
                        index % 2 === 0 ? "bg-table-row" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-foreground">{repasse.data}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{repasse.valor}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{repasse.descricao}</td>
                      <td className="px-6 py-4">
                        <Badge variant={repasse.status === "Concluído" ? "success" : "destructive"}>
                          {repasse.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>

      {/* Corredor Profile Dialog */}
      <CorredorProfileDialog
        open={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        corredor={{
          name: parceiro.name,
          type: "INFLUENCIADORA",
          avatar: parceiro.avatar,
          experiencia: "2 anos correndo",
          ranking: "12º lugar",
          nivel: "Machine",
          badges: [
            { name: "Hero", icon: "🏆" },
            { name: "Machine", icon: "🏆" }
          ]
        }}
      />

      {/* Inativar Parceiro Dialog */}
      <InativarParceiroDialog
        open={isInativarDialogOpen}
        onOpenChange={setIsInativarDialogOpen}
        parceiroNome={parceiro.name}
        onConfirm={() => {
          toast({
            title: "Parceiro inativado",
            description: `${parceiro.name} foi inativado com sucesso.`,
          });
        }}
      />
    </div>
  );
};

export default ParceiroDetalhes;
