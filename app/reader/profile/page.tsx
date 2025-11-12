'use client';

import { useState } from 'react';
import { ProfileInfo } from '../../../components/reader/profile/profile-info';
import { ActivityStats } from '../../../components/reader/profile/activity-stats';
import { ReadingHistoryCard } from '../../../components/reader/profile/reading-history';
import { PreferencesForm } from '../../../components/reader/profile/preferences-form';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { UserPreferences } from '../../../types/reader/profile';
import { BookOpen, Settings, History } from 'lucide-react';
import {
  mockUserProfile,
  mockReadingHistory,
  mockUserPreferences,
  mockActivityStats,
} from '../../../data/reader/mock-profile';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleEditProfile = () => {
    console.log('Editando perfil');
    // Implementar modal de edição
  };

  const handleSavePreferences = (preferences: UserPreferences) => {
    console.log('Salvando preferências:', preferences);
    // Implementar lógica de salvamento
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie suas informações e preferências
        </p>
      </div>

      {/* Profile Info */}
      <ProfileInfo profile={mockUserProfile} onEdit={handleEditProfile} />

      {/* Activity Stats */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Estatísticas de Atividade</h2>
        <ActivityStats stats={mockActivityStats} />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Histórico de Leitura
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Preferências
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Últimas Leituras</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockReadingHistory.slice(0, 4).map((history) => (
                <ReadingHistoryCard key={history.id} history={history} />
              ))}
            </div>
            {mockReadingHistory.length > 4 && (
              <div className="mt-4 text-center">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('history')}
                >
                  Ver Todo Histórico
                </Button>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Conquistas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-3xl mb-2">🏆</div>
                <p className="font-semibold text-sm">Leitor Ávido</p>
                <p className="text-xs text-muted-foreground">10+ livros lidos</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-3xl mb-2">📚</div>
                <p className="font-semibold text-sm">Colecionador</p>
                <p className="text-xs text-muted-foreground">15+ favoritos</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-3xl mb-2">⭐</div>
                <p className="font-semibold text-sm">Crítico</p>
                <p className="text-xs text-muted-foreground">5+ avaliações</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <div className="text-3xl mb-2">🔥</div>
                <p className="font-semibold text-sm">Consistente</p>
                <p className="text-xs text-muted-foreground">15 dias seguidos</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Histórico Completo ({mockReadingHistory.length} livros)
              </h3>
              <Button variant="outline" size="sm">
                Exportar Histórico
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockReadingHistory.map((history) => (
                <ReadingHistoryCard key={history.id} history={history} />
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <PreferencesForm
            preferences={mockUserPreferences}
            onSave={handleSavePreferences}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}