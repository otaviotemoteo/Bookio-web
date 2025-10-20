import React from "react";
import { Card } from "../../ui/card";
import { BookOpen, Clock, AlertCircle, CheckCircle } from "lucide-react";

interface LoansStatsProps {
  activeLoans: number;
  overdueLoans: number;
  returnedToday: number;
  totalFines: number;
}

export const LoansStats: React.FC<LoansStatsProps> = ({
  activeLoans,
  overdueLoans,
  returnedToday,
  totalFines,
}) => {
  const statsDisplay = [
    {
      label: "Empréstimos Ativos",
      value: activeLoans,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Livros em circulação",
    },
    {
      label: "Em Atraso",
      value: overdueLoans,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Requerem atenção",
    },
    {
      label: "Devolvidos Hoje",
      value: returnedToday,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Devoluções registradas",
    },
    {
      label: "Multas Pendentes",
      value: `R$ ${totalFines.toFixed(2)}`,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Total a receber",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsDisplay.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {stat.description}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};