import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: number;
  description: string;
  type: string;
  amount: string;
  date: string;
  status: "Concluído" | "Pendente" | "Cancelado";
  partner: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    description: "Inscrição Maratona SP",
    type: "Recebimento",
    amount: "R$ 1.200,00",
    date: "15/11/2025",
    status: "Concluído",
    partner: "Ana Clara Silva",
  },
  {
    id: 2,
    description: "Repasse Assessoria",
    type: "Repasse",
    amount: "R$ 850,00",
    date: "14/11/2025",
    status: "Pendente",
    partner: "João Pedro Almeida",
  },
  {
    id: 3,
    description: "Inscrição Corrida 10K",
    type: "Recebimento",
    amount: "R$ 450,00",
    date: "12/11/2025",
    status: "Concluído",
    partner: "Fernanda Ribeiro",
  },
  {
    id: 4,
    description: "Repasse Treinamento",
    type: "Repasse",
    amount: "R$ 600,00",
    date: "10/11/2025",
    status: "Cancelado",
    partner: "Carlos Martins",
  },
  {
    id: 5,
    description: "Inscrição Meia Maratona",
    type: "Recebimento",
    amount: "R$ 980,00",
    date: "08/11/2025",
    status: "Concluído",
    partner: "Tatiane Lima",
  },
  {
    id: 6,
    description: "Repasse Academia",
    type: "Repasse",
    amount: "R$ 1.100,00",
    date: "05/11/2025",
    status: "Concluído",
    partner: "Ricardo Gomes",
  },
  {
    id: 7,
    description: "Inscrição Trail Run",
    type: "Recebimento",
    amount: "R$ 750,00",
    date: "03/11/2025",
    status: "Pendente",
    partner: "Patricia Almeida",
  },
  {
    id: 8,
    description: "Repasse Influenciador",
    type: "Repasse",
    amount: "R$ 420,00",
    date: "01/11/2025",
    status: "Concluído",
    partner: "Luiz Henrique",
  },
  {
    id: 9,
    description: "Inscrição Ultramaratona",
    type: "Recebimento",
    amount: "R$ 2.200,00",
    date: "28/10/2025",
    status: "Concluído",
    partner: "Lucas Oliveira",
  },
  {
    id: 10,
    description: "Repasse Assessoria",
    type: "Repasse",
    amount: "R$ 950,00",
    date: "25/10/2025",
    status: "Concluído",
    partner: "Maria Fernanda",
  },
];

const getStatusVariant = (status: Transaction["status"]) => {
  switch (status) {
    case "Concluído":
      return "success";
    case "Pendente":
      return "warning";
    case "Cancelado":
      return "destructive";
    default:
      return "secondary";
  }
};

export const FinanceiroTable = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-table-header">
        <h3 className="text-foreground font-semibold">Transações Financeiras</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-table-header">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Descrição</th>
              <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Tipo</th>
              <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Valor</th>
              <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Data</th>
              <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Parceiro</th>
              <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm text-foreground">{transaction.description}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.type}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{transaction.amount}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.date}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.partner}</td>
                <td className="px-6 py-4">
                  <Badge variant={getStatusVariant(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
