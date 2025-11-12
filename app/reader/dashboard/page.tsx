'use client';

import { StatsCard } from '../../../components/reader/dashboard/stats-card';
import { RecentActivity } from '../../../components/reader/dashboard/recent-activity';
import { QuickActions } from '../../../components/reader/dashboard/quick-actions';
import { BookOpen, Calendar, Heart, History } from 'lucide-react';
import { mockUserStats, mockRecentActivities, mockQuickActions } from '../../../data/reader/mock-dashboard';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Bem-vindo de volta! Aqui está um resumo das suas atividades.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Empréstimos Ativos"
          value={mockUserStats.activeLoans}
          icon={BookOpen}
          color="bg-blue-500"
          trend={{ value: 20, isPositive: true }}
        />
        <StatsCard
          title="Reservas Pendentes"
          value={mockUserStats.pendingReservations}
          icon={Calendar}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Livros Favoritos"
          value={mockUserStats.favoriteBooks}
          icon={Heart}
          color="bg-red-500"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Histórico de Leitura"
          value={mockUserStats.readingHistory}
          icon={History}
          color="bg-green-500"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions actions={mockQuickActions} />

      {/* Recent Activity */}
      <RecentActivity activities={mockRecentActivities} />
    </div>
  );
}