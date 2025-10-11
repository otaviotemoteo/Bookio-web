import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { RecentActivity as RecentActivityType } from '../../../types/reader/dashboard';
import { BookOpen, Calendar, Heart, RotateCcw } from 'lucide-react';

interface RecentActivityProps {
  activities: RecentActivityType[];
}

const activityIcons = {
  loan: BookOpen,
  reservation: Calendar,
  return: RotateCcw,
  favorite: Heart,
};

const statusColors = {
  active: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
};

const statusLabels = {
  active: 'Ativo',
  pending: 'Pendente',
  completed: 'Concluído',
  overdue: 'Atrasado',
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type];
          return (
            <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="p-2 rounded-full bg-primary/10">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{activity.bookTitle}</p>
                <p className="text-sm text-muted-foreground truncate">{activity.bookAuthor}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
              </div>
              <Badge className={statusColors[activity.status]}>
                {statusLabels[activity.status]}
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}