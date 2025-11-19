import React from "react";
import { Card } from "../../ui/card";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { SchedulingSimple } from "../../../types/index";

interface SchedulingStatsProps {
  schedulings: SchedulingSimple[];
}

const SchedulingStatsComponent: React.FC<SchedulingStatsProps> = ({
  schedulings,
}) => {
  const stats = {
    pending: schedulings.filter((s) => s.status === "PENDING").length,
    completed: schedulings.filter((s) => s.status === "COMPLETED").length,
    cancelled: schedulings.filter((s) => s.status === "CANCELLED").length,
    expired: schedulings.filter((s) => s.status === "EXPIRED").length,
  };

  const statsDisplay = [
    {
      label: "Pendentes",
      value: stats.pending,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Concluídos",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Cancelados",
      value: stats.cancelled,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Expirados",
      value: stats.expired,
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
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
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default SchedulingStatsComponent;
