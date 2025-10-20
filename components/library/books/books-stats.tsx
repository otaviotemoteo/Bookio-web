import React from "react";
import { Card } from "../../ui/card";
import { BookOpen, Users, Search } from "lucide-react";

interface BooksStatsProps {
  totalBooks: number;
  uniqueAuthors: number;
  searchResults: number;
}

export const BooksStats: React.FC<BooksStatsProps> = ({
  totalBooks,
  uniqueAuthors,
  searchResults,
}) => {
  const statsDisplay = [
    {
      label: "Total de Livros",
      value: totalBooks,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Autores Únicos",
      value: uniqueAuthors,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Resultados da Busca",
      value: searchResults,
      icon: Search,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
  );
};