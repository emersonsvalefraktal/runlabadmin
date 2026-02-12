import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import nivelIcon from "@/assets/nivel-icon.png";
import { Button } from "@/components/ui/button";

const CorredorDetalhes = () => {
  const { id } = useParams();

  // Mock data - replace with actual API call
  const corredor = {
    id,
    name: "Ana Clara Silva",
    cpf: "123.456.789-99",
    email: "anacsilva@gmail.com",
    phone: "(99) 99999-9999",
    birthDate: "29/07/1994",
    city: "São Paulo",
    state: "São Paulo",
    gender: "Feminino",
    modality: "Corrida outdoor",
    lastAccess: "01/01/2025 • 13:20",
    level: 10,
    plan: "Essencial",
    avatar: "/placeholder.svg",
    stats: {
      provasConcluidas: 21,
      assinaturas: 32,
      distancia: "10ª"
    }
  };

  const planosAtivos = [
    {
      nome: "Plano essencial",
      vigencia: "01/01/2025 - 01/02/2026",
      valor: "12x de R$149,90",
      pagamento: "Cartão de crédito"
    },
    {
      nome: "Plano essencial",
      vigencia: "01/01/2024 - 01/02/2025",
      valor: "12x de R$139,90",
      pagamento: "Cartão de débito"
    }
  ];

  const transacoes = [
    {
      tipo: "Inscrição - Etapa patroc...",
      formaPagamento: "Crédito",
      parcelas: "2 parcelas",
      dataVencimento: "05/11/2025",
      dataPagamento: "30/11/2025",
      valor: "R$99,90",
      status: "Paga"
    },
    {
      tipo: "Assinatura",
      formaPagamento: "Crédito",
      parcelas: "3 parcelas",
      dataVencimento: "05/10/2025",
      dataPagamento: "30/10/2025",
      valor: "R$149,90",
      status: "Vencida"
    },
    {
      tipo: "Inscrição - Etapa patroc...",
      formaPagamento: "Débito",
      parcelas: "Não se aplica",
      dataVencimento: "05/09/2025",
      dataPagamento: "30/09/2025",
      valor: "R$99,90",
      status: "Vencida"
    },
    {
      tipo: "Assinatura",
      formaPagamento: "Crédito",
      parcelas: "4 parcelas",
      dataVencimento: "05/08/2025",
      dataPagamento: "30/08/2025",
      valor: "R$149,90",
      status: "Paga"
    },
    {
      tipo: "Assinatura",
      formaPagamento: "PIX",
      parcelas: "Não se aplica",
      dataVencimento: "05/07/2025",
      dataPagamento: "30/07/2025",
      valor: "R$149,90",
      status: "Paga"
    },
    {
      tipo: "Assinatura",
      formaPagamento: "PIX",
      parcelas: "Não se aplica",
      dataVencimento: "05/06/2025",
      dataPagamento: "30/08/2025",
      valor: "R$149,90",
      status: "Paga"
    },
    {
      tipo: "Assinatura",
      formaPagamento: "PIX",
      parcelas: "Não se aplica",
      dataVencimento: "05/06/2025",
      dataPagamento: "30/06/2025",
      valor: "R$149,90",
      status: "Paga"
    },
    {
      tipo: "Assinatura",
      formaPagamento: "Débito",
      parcelas: "Não se aplica",
      dataVencimento: "05/04/2025",
      dataPagamento: "30/04/2025",
      valor: "R$149,90",
      status: "Paga"
    },
    {
      tipo: "Assinatura",
      formaPagamento: "Crédito",
      parcelas: "2 parcelas",
      dataVencimento: "05/03/2025",
      dataPagamento: "30/01/2025",
      valor: "R$149,90",
      status: "Paga"
    },
    {
      tipo: "Assinatura",
      formaPagamento: "Crédito",
      parcelas: "2 parcelas",
      dataVencimento: "05/02/2025",
      dataPagamento: "30/02/2025",
      valor: "R$149,90",
      status: "Paga"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 pt-24">
        {/* Back Button */}
        <div className="mt-16 mb-6">
          <Link to="/corredores">
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
          <Link to="/corredores" className="hover:text-foreground">
            Corredores
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{corredor.name}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-foreground/40 mb-6">Dados do usuário</h1>

        {/* Main Profile Card */}
        <Card className="mb-6 bg-[#2a2a2a] border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="rounded-full bg-[#d4af37] overflow-hidden flex-shrink-0" style={{ width: '140px', height: '140px' }}>
                  <img src={corredor.avatar} alt={corredor.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <img src={nivelIcon} alt="Nível" className="w-10 h-10" />
                    <span className="text-sm text-success">NÍVEL {corredor.level}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{corredor.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-xs">CPF: </span>{corredor.cpf}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">CORREDOR E PARCEIRO</p>
                </div>
              </div>
              <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">{corredor.plan}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-start">
          {/* Personal Info Card */}
          <Card className="bg-[#2a2a2a] border-0">
            <CardContent className="p-6 space-y-4 divide-y divide-border">
              <div className="pt-0">
                <p className="text-xs text-muted-foreground mb-1">E-mail</p>
                <p className="text-sm text-foreground">{corredor.email}</p>
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">Telefone</p>
                <p className="text-sm text-foreground">{corredor.phone}</p>
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">Data de nascimento</p>
                <p className="text-sm text-foreground">{corredor.birthDate}</p>
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">Cidade</p>
                <p className="text-sm text-foreground">{corredor.city}</p>
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">Estado</p>
                <p className="text-sm text-foreground">{corredor.state}</p>
              </div>
            </CardContent>
          </Card>

          {/* Running Info Card */}
          <Card className="bg-[#2a2a2a] border-0">
            <CardContent className="p-6 space-y-4 divide-y divide-border">
              <div className="pt-0">
                <p className="text-xs text-muted-foreground mb-1">Sexo</p>
                <p className="text-sm text-foreground">{corredor.gender}</p>
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">Modalidade preferida</p>
                <p className="text-sm text-foreground">{corredor.modality}</p>
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground mb-1">Último acesso</p>
                <p className="text-sm text-foreground">{corredor.lastAccess}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Histórico de participação em competições</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#2a2a2a] border-0">
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground mb-2">Nº de provas concluídas</p>
              <p className="text-3xl font-bold text-foreground">{corredor.stats.provasConcluidas}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#2a2a2a] border-0">
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground mb-2">Nº de assinaturas em provas</p>
              <p className="text-3xl font-bold text-foreground">{corredor.stats.assinaturas}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#2a2a2a] border-0">
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground mb-2">Ranking anual</p>
              <p className="text-3xl font-bold text-foreground">{corredor.stats.distancia}</p>
            </CardContent>
          </Card>
          </div>
        </div>

        {/* Active Plans Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Planos contratados</h2>
          <Card className="bg-card border-0 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-table-header">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Nome</th>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Vigência</th>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Valor pago</th>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Forma de pagamento</th>
                  </tr>
                </thead>
                <tbody>
                  {planosAtivos.map((plano, index) => (
                    <tr
                      key={index}
                      className={`border-t border-border ${
                        index % 2 === 0 ? "bg-table-row" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-foreground">{plano.nome}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{plano.vigencia}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{plano.valor}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{plano.pagamento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Transaction History Section */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Cobranças realizadas</h2>
          <Card className="bg-card border-0 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-table-header">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Tipo de pagamento</th>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Forma de pagamento</th>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Nº de parcelas</th>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Data de vencimento</th>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Data de pagamento</th>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Valor da fatura</th>
                    <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transacoes.map((transacao, index) => (
                    <tr
                      key={index}
                      className={`border-t border-border ${
                        index % 2 === 0 ? "bg-table-row" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-foreground">{transacao.tipo}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{transacao.formaPagamento}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{transacao.parcelas}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{transacao.dataVencimento}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{transacao.dataPagamento}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{transacao.valor}</td>
                      <td className="px-6 py-4">
                        <Badge variant={transacao.status === "Paga" ? "success" : "destructive"}>
                          {transacao.status}
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
    </div>
  );
};

export default CorredorDetalhes;
