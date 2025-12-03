"use client";

import { useRouter } from "next/navigation";
import { BarChartMetrics } from "./bar-chart-metrics";
import { LinearChartMetrics } from "./linear-chart-metrics";

interface DashboardMetricsProps {
  books: any[];
  readers: any[];
  loans: any[];
  penalties: any[];
}

export function DashboardMetrics({
  books,
  readers,
  loans,
  penalties
}: DashboardMetricsProps) {
  const router = useRouter();

  // Estatísticas rápidas
  const stats = [
    {
      title: "Total de Livros",
      value: books.length,
      icon: "/book.svg",
      color: "bg-blue-500",
      route: "books"
    },
    {
      title: "Total de Leitores",
      value: readers.length,
      icon: "/people.svg",
      color: "bg-green-500",
      route: "readers"
    },
    {
      title: "Empréstimos Ativos",
      value: loans.filter(loan => loan.status === "ACTIVE").length,
      icon: "/scheduling.svg",
      color: "bg-purple-500",
      route: "loans"
    },
    {
      title: "Multas Pendentes",
      value: penalties.filter(penalty => !penalty.paid).length,
      icon: "/money.svg",
      color: "bg-red-500",
      route: "payments"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie sua biblioteca de forma eficiente e organizada
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <button
              key={index}
              onClick={() => router.push(stat.route)}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <img src={stat.icon} alt={stat.title} className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-4 font-medium">
                Ver detalhes →
              </p>
            </button>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChartMetrics
            books={books}
            readers={readers}
            loans={loans}
            penalties={penalties}
          />
          
          <LinearChartMetrics
            loans={loans}
            penalties={penalties}
          />
        </div>
      </div>
    </div>
  );
}