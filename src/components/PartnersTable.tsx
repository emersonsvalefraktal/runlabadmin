import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Partner {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  type: string;
  lastAccess: string;
  status: "Ativo" | "Em analise" | "Rejeitado" | "Inativo";
}

const partners: Partner[] = [
  {
    id: 1,
    name: "Ana Clara Silva",
    email: "anacsilva@gmail.com",
    phone: "(00) 9783-4311",
    cpfCnpj: "123.456.789-99",
    type: "Assessoria",
    lastAccess: "01/09/2025 16:30",
    status: "Ativo",
  },
  {
    id: 2,
    name: "João Pedro Almeida",
    email: "joaopedro@gmail.com",
    phone: "(11) 9183-4415",
    cpfCnpj: "123.456.789-99",
    type: "Treinador",
    lastAccess: "01/09/2025 16:30",
    status: "Em analise",
  },
  {
    id: 3,
    name: "Fernanda Ribeiro",
    email: "fernandarib@gmail.com",
    phone: "(11) 9744-4311",
    cpfCnpj: "123.456.789-99",
    type: "Treinador",
    lastAccess: "01/09/2025 16:30",
    status: "Rejeitado",
  },
  {
    id: 4,
    name: "Carlos Martins",
    email: "carlosmartins@gmail.com",
    phone: "(11) 9283-4415",
    cpfCnpj: "123.456.789-99",
    type: "Academia",
    lastAccess: "01/09/2025 16:30",
    status: "Ativo",
  },
  {
    id: 5,
    name: "Tatiane Lima",
    email: "tatianelima@gmail.com",
    phone: "(00) 9783-4311",
    cpfCnpj: "123.456.789-99",
    type: "Academia",
    lastAccess: "01/09/2025 16:30",
    status: "Ativo",
  },
  {
    id: 6,
    name: "Ricardo Gomes",
    email: "ricardogomes@gmail.com",
    phone: "(11) 9783-4311",
    cpfCnpj: "123.456.789-99",
    type: "Influenciador",
    lastAccess: "01/09/2025 16:30",
    status: "Em analise",
  },
  {
    id: 7,
    name: "Patricia Almeida",
    email: "patriciaalmeida@gmail.com",
    phone: "(11) 9744-4311",
    cpfCnpj: "123.456.789-99",
    type: "Influenciador",
    lastAccess: "01/09/2025 16:30",
    status: "Ativo",
  },
  {
    id: 8,
    name: "Luiz Henrique",
    email: "luizhenrique@gmail.com",
    phone: "(11) 9783-4312",
    cpfCnpj: "123.456.789-99",
    type: "Influenciador",
    lastAccess: "01/09/2025 16:30",
    status: "Ativo",
  },
  {
    id: 9,
    name: "Lucas Oliveira",
    email: "lucasoliveira@gmail.com",
    phone: "(11) 9783-4314",
    cpfCnpj: "123.456.789-99",
    type: "Academia",
    lastAccess: "01/09/2025 16:30",
    status: "Inativo",
  },
  {
    id: 10,
    name: "Maria Fernanda",
    email: "mariafernd@gmail.com",
    phone: "(11) 9744-4311",
    cpfCnpj: "123.456.789-99",
    type: "Academia",
    lastAccess: "01/09/2025 16:30",
    status: "Inativo",
  },
];

const getStatusVariant = (status: Partner["status"]) => {
  switch (status) {
    case "Ativo":
      return "success";
    case "Em analise":
      return "warning";
    case "Rejeitado":
      return "destructive";
    case "Inativo":
      return "secondary";
    default:
      return "secondary";
  }
};

export const PartnersTable = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-table-title">
        <h3 className="text-foreground font-semibold">Parceiros</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-table-header">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Nome</th>
              <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>E-mail</th>
              <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Telefone</th>
              <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>CFP/CNPJ</th>
              <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Tipo de parceiro</th>
              <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Ultimo acesso</th>
              <th className="px-6 py-3 text-left text-sm font-medium" style={{ color: '#E0E0E0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner, index) => (
              <tr
                key={partner.id}
                className={`border-t border-border hover:bg-table-row-hover transition-colors cursor-pointer ${
                  index % 2 === 0 ? "bg-table-row" : ""
                }`}
              >
                <td className="px-6 py-4 text-sm text-foreground">
                  <Link to={`/parceiros/${partner.id}`} className="block w-full">
                    {partner.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <Link to={`/parceiros/${partner.id}`} className="block w-full">
                    {partner.email}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <Link to={`/parceiros/${partner.id}`} className="block w-full">
                    {partner.phone}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <Link to={`/parceiros/${partner.id}`} className="block w-full">
                    {partner.cpfCnpj}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <Link to={`/parceiros/${partner.id}`} className="block w-full">
                    {partner.type}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-foreground whitespace-nowrap">
                  <Link to={`/parceiros/${partner.id}`} className="block w-full">
                    {partner.lastAccess}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/parceiros/${partner.id}`} className="block w-full">
                    <Badge variant={getStatusVariant(partner.status)}>{partner.status}</Badge>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
