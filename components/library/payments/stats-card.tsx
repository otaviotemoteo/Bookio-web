import React from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "../../ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div
        className={`p-3 rounded-lg ${
          trend === "up" ? "bg-red-100" : "bg-green-100"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${
            trend === "up" ? "text-red-600" : "text-green-600"
          }`}
        />
      </div>
    </div>
  </Card>
);
