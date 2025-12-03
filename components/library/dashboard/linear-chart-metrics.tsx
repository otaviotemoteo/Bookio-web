"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LinearChartMetricsProps {
  loans: any[];
  penalties: any[];
}

export function LinearChartMetrics({
  loans,
  penalties
}: LinearChartMetricsProps) {
  // Agrupa por mês (últimos 6 meses)
  const getLast6Months = () => {
    const months = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('pt-BR', { month: 'long' });
      months.push({
        month: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        fullDate: date
      });
    }
    
    return months;
  };

  const months = getLast6Months();

  const data = months.map(({ month, fullDate }) => {
    const monthStart = new Date(fullDate.getFullYear(), fullDate.getMonth(), 1);
    const monthEnd = new Date(fullDate.getFullYear(), fullDate.getMonth() + 1, 0);

    // Conta empréstimos do mês
    const loansCount = loans.filter(loan => {
      const dateStr = loan.createdAt || loan.loanDate || loan.returnDate;
      if (!dateStr) return false;
      
      try {
        const loanDate = new Date(dateStr);
        return loanDate >= monthStart && loanDate <= monthEnd;
      } catch {
        return false;
      }
    }).length;

    // Conta multas do mês
    const penaltiesCount = penalties.filter(penalty => {
      const dateStr = penalty.createdAt || penalty.date;
      if (!dateStr) return false;
      
      try {
        const penaltyDate = new Date(dateStr);
        return penaltyDate >= monthStart && penaltyDate <= monthEnd;
      } catch {
        return false;
      }
    }).length;

    return {
      month,
      emprestimos: loansCount,
      multas: penaltiesCount
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Atividade dos Últimos 6 Meses
      </h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="emprestimos" 
            stroke="#eab308" 
            strokeWidth={2}
            name="Empréstimos"
          />
          <Line 
            type="monotone" 
            dataKey="multas" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Multas"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="text-sm text-gray-600">
            Empréstimos
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm text-gray-600">
            Multas
          </span>
        </div>
      </div>
    </div>
  );
}