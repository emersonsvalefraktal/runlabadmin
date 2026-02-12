import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const MetricCard = ({ 
  title, 
  value,
  highlightValue = false,
  highlightTitle = false
}: { 
  title: string; 
  value: string | number;
  highlightValue?: boolean;
  highlightTitle?: boolean;
}) => (
  <Card className="p-6 bg-card">
    <div className="space-y-[30px]">
      <p className={`text-sm ${highlightTitle ? 'text-primary' : 'text-muted-foreground'}`}>
        {title}
      </p>
      <p className={`text-3xl font-bold ${highlightValue ? 'text-primary' : 'text-foreground'}`}>
        {value}
      </p>
    </div>
  </Card>
);

const receiptData = [
  { name: 'Inscrição', value: 40, color: '#CCF725' },
  { name: 'Assessoria', value: 60, color: '#8B9D00' },
  { name: 'Assinatura', value: 30, color: '#E8F5A0' },
];

const partnerData = [
  { name: 'Academia', value: 50, color: '#CCF725' },
  { name: 'Treinador', value: 25, color: '#8B9D00' },
  { name: 'Assessoria', value: 25, color: '#E8F5A0' },
];

const monthlyData = [
  { month: 'Jan', value: 22 },
  { month: 'Fev', value: 18 },
  { month: 'Mar', value: 8 },
  { month: 'Abr', value: 15 },
  { month: 'Mai', value: 11 },
  { month: 'Jun', value: 17 },
  { month: 'Jul', value: 17 },
  { month: 'Ago', value: 13 },
  { month: 'Set', value: 7 },
  { month: 'Out', value: 17 },
  { month: 'Nov', value: 20 },
  { month: 'Dez', value: 0 },
];

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const FinanceiroOverview = () => {
  const [currentMonth, setCurrentMonth] = useState(8); // Setembro (index 8)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const handleSelectMonth = (monthIndex: number) => {
    setCurrentMonth(monthIndex);
    setIsPopoverOpen(false);
  };

  const CustomLegend = ({ payload }: any) => (
    <div className="flex flex-col gap-2">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div 
            className="w-5 h-5" 
            style={{ backgroundColor: entry.color, borderRadius: '5px' }}
          />
          <span className="text-sm text-muted-foreground">
            {entry.value} ({entry.payload.value}%)
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary"
            onClick={handlePrevMonth}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="secondary" className="px-8">
                <h2 className="text-lg font-medium text-primary min-w-[120px] text-center">
                  {months[currentMonth]}
                </h2>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4 bg-card border-border" align="center">
              <div className="grid grid-cols-3 gap-2">
                {months.map((month, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectMonth(index)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      index === currentMonth
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'bg-card text-foreground hover:bg-muted'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Button 
            variant="secondary"
            onClick={handleNextMonth}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard 
          title="Faturamento no período" 
          value="R$ 89.900,00"
          highlightValue
          highlightTitle
        />
        <MetricCard 
          title="Inscrições pagas" 
          value="253" 
        />
        <MetricCard 
          title="Inscrições com pagamento em aberto" 
          value="89" 
        />
        <MetricCard 
          title="Nº de assinantes" 
          value="109" 
        />
        <MetricCard 
          title="Margem bruta da Runlab" 
          value="R$ 14.990,00"
          highlightValue
          highlightTitle
        />
        <MetricCard 
          title="Comissão de parceiros" 
          value="R$ 5.510,00" 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Receipt Type Pie Chart */}
        <Card className="p-6 bg-card">
          <h3 className="text-sm text-muted-foreground mb-4">
            Receita por tipo de recebimento
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={receiptData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                paddingAngle={0}
                dataKey="value"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
                  const radius = outerRadius * 0.65;
                  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                  return (
                    <text x={x} y={y} fill="#000" textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="500">
                      <tspan x={x} dy="0">{name}</tspan>
                      <tspan x={x} dy="14">({value}%)</tspan>
                    </text>
                  );
                }}
                labelLine={false}
              >
                {receiptData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend content={<CustomLegend />} layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Partner Commission Pie Chart */}
        <Card className="p-6 bg-card">
          <h3 className="text-sm text-muted-foreground mb-4">
            Comissão por tipo de parceiro
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={partnerData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                paddingAngle={0}
                dataKey="value"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
                  const radius = outerRadius * 0.65;
                  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                  return (
                    <text x={x} y={y} fill="#000" textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="500">
                      <tspan x={x} dy="0">{name}</tspan>
                      <tspan x={x} dy="14">({value}%)</tspan>
                    </text>
                  );
                }}
                labelLine={false}
              >
                {partnerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend content={<CustomLegend />} layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card className="p-6 bg-card">
        <h3 className="text-sm text-muted-foreground mb-6">
          Inscrições realizadas
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="month" 
              stroke="#888"
              tick={{ fill: '#888' }}
            />
            <YAxis 
              stroke="#888"
              tick={{ fill: '#888' }}
              tickFormatter={(value) => `${value}K`}
            />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
              label={{ 
                position: 'insideTop', 
                fill: '#000',
                formatter: (value: number) => value > 0 ? `${value}K` : ''
              }}
            >
              {monthlyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#B3D91F' : '#EEFF99'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
