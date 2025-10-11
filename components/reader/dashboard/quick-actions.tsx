import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { QuickAction as QuickActionType } from '../../../types/reader/dashboard';
import Link from 'next/link';
import { BookOpen, Calendar, Heart, Search, CreditCard, User } from 'lucide-react';

interface QuickActionsProps {
  actions: QuickActionType[];
}

const actionIcons = {
  search: Search,
  loans: BookOpen,
  reservations: Calendar,
  favorites: Heart,
  payments: CreditCard,
  profile: User,
};

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {actions.map((action) => {
          const Icon = actionIcons[action.icon as keyof typeof actionIcons] || BookOpen;
          return (
            <Link key={action.id} href={action.href}>
              <Button
                variant="outline"
                className={`w-full h-auto flex-col gap-2 py-4 hover:shadow-md transition-all ${action.color}`}
              >
                <Icon className="w-6 h-6" />
                <div className="text-center">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                </div>
              </Button>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}