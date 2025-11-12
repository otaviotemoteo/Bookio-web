import { Card } from '../../../components/ui/card';
import { ActivityStats as ActivityStatsType } from '../../../types/reader/profile';
import { BookOpen, Calendar, Heart, Flame, Grid3x3, Star } from 'lucide-react';

interface ActivityStatsProps {
  stats: ActivityStatsType;
}

export function ActivityStats({ stats }: ActivityStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card className="p-4">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="p-3 rounded-full bg-blue-100">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.totalBooksRead}</p>
            <p className="text-xs text-muted-foreground">Livros Lidos</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="p-3 rounded-full bg-green-100">
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.totalLoans}</p>
            <p className="text-xs text-muted-foreground">Empréstimos</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="p-3 rounded-full bg-yellow-100">
            <Heart className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.totalReservations}</p>
            <p className="text-xs text-muted-foreground">Reservas</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="p-3 rounded-full bg-red-100">
            <Flame className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.currentStreak}</p>
            <p className="text-xs text-muted-foreground">Dias Seguidos</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="p-3 rounded-full bg-purple-100">
            <Grid3x3 className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-bold line-clamp-1">{stats.favoriteCategory}</p>
            <p className="text-xs text-muted-foreground">Categoria Favorita</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="p-3 rounded-full bg-orange-100">
            <Star className="w-5 h-5 text-orange-600 fill-orange-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.averageRating}</p>
            <p className="text-xs text-muted-foreground">Avaliação Média</p>
          </div>
        </div>
      </Card>
    </div>
  );
}