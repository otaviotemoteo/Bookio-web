import React from "react";
import { Card } from "../../ui/card";
import { Clock, CheckCircle, AlertTriangle, Users } from "lucide-react";

interface ReadersStatsProps {
  activeReservations: number;
  readyForPickup: number;
  waitingList: number;
  totalReservations: number;
}

export const ReadersStats: React.FC<ReadersStatsProps> = ({
  activeReservations,
  readyForPickup,
  waitingList,
  totalReservations,
}) => {
  const statsDisplay = [
    {
      label: "Reservas Ativas",
      value: activeReservations,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Prontas para Retirada",
      value: readyForPickup,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Fila de Espera",
      value: waitingList,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Total de Reservas",
      value: totalReservations,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
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
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};