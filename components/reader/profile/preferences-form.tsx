import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { UserPreferences } from '../../../types/reader/profile';
import { Bell, Lock, Globe, Save } from 'lucide-react';

interface PreferencesFormProps {
  preferences: UserPreferences;
  onSave?: (preferences: UserPreferences) => void;
}

export function PreferencesForm({ preferences, onSave }: PreferencesFormProps) {
  return (
    <div className="space-y-6">
      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Notificações</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificações por Email</p>
              <p className="text-sm text-muted-foreground">Receba atualizações por email</p>
            </div>
            <input
              type="checkbox"
              defaultChecked={preferences.notifications.email}
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificações por SMS</p>
              <p className="text-sm text-muted-foreground">Receba lembretes por SMS</p>
            </div>
            <input
              type="checkbox"
              defaultChecked={preferences.notifications.sms}
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificações Push</p>
              <p className="text-sm text-muted-foreground">Receba notificações no navegador</p>
            </div>
            <input
              type="checkbox"
              defaultChecked={preferences.notifications.push}
              className="w-4 h-4"
            />
          </div>
          <div className="border-t pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm">Reserva disponível</p>
              <input
                type="checkbox"
                defaultChecked={preferences.notifications.reservationAvailable}
                className="w-4 h-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Empréstimo próximo do vencimento</p>
              <input
                type="checkbox"
                defaultChecked={preferences.notifications.loanDueSoon}
                className="w-4 h-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Novos livros no catálogo</p>
              <input
                type="checkbox"
                defaultChecked={preferences.notifications.newBooks}
                className="w-4 h-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Newsletter mensal</p>
              <input
                type="checkbox"
                defaultChecked={preferences.notifications.newsletter}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Privacy */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Privacidade</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Perfil Público</p>
              <p className="text-sm text-muted-foreground">Permitir que outros vejam seu perfil</p>
            </div>
            <input
              type="checkbox"
              defaultChecked={preferences.privacy.showProfile}
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Histórico de Leitura</p>
              <p className="text-sm text-muted-foreground">Mostrar livros que você já leu</p>
            </div>
            <input
              type="checkbox"
              defaultChecked={preferences.privacy.showReadingHistory}
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Favoritos</p>
              <p className="text-sm text-muted-foreground">Mostrar seus livros favoritos</p>
            </div>
            <input
              type="checkbox"
              defaultChecked={preferences.privacy.showFavorites}
              className="w-4 h-4"
            />
          </div>
        </div>
      </Card>

      {/* Language & Theme */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Idioma e Aparência</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Idioma</label>
            <select
              defaultValue={preferences.language}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tema</label>
            <select
              defaultValue={preferences.theme}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
              <option value="system">Automático (Sistema)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" onClick={() => onSave?.(preferences)}>
          <Save className="w-4 h-4 mr-2" />
          Salvar Preferências
        </Button>
      </div>
    </div>
  );
}