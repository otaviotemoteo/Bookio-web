import React from "react";
import { Card } from "../../ui/card";
import { Book, Users, ClipboardList, DollarSign } from "lucide-react";

interface LibraryStats {
  totalBooks: number;
  totalUsers: number;
  totalLoans: number;
  totalFines: number;
}

interface DashboardProps {
  stats?: LibraryStats;
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  // Dados mockados (use os props se fornecidos)
  const libraryStats: LibraryStats = stats || {
    totalBooks: 1500,
    totalUsers: 300,
    totalLoans: 1200,
    totalFines: 300,
  };

  const statsDisplay = [
    {
      label: "Total de Livros",
      value: libraryStats.totalBooks,
      icon: Book,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Total de Usuários",
      value: libraryStats.totalUsers,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Empréstimos Ativos",
      value: libraryStats.totalLoans,
      icon: ClipboardList,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Multas Pendentes",
      value: `$${libraryStats.totalFines}`,
      icon: DollarSign,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">
        Dashboard da Biblioteca
      </h1>

      {/* Cards de Visão Geral */}
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
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Visão Geral das Métricas */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Visão Geral das Métricas
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <span>Livros Emprestados este Mês</span>
            <span className="font-bold text-xl">500</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Livros Devolvidos</span>
            <span className="font-bold text-xl">450</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Novos Cadastros de Usuários</span>
            <span className="font-bold text-xl">50</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;