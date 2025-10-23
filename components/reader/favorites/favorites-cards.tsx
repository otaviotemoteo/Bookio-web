import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Favorite } from '../../../types/reader/favorites';
import { Heart, Calendar, BookOpen, Star, Trash2, FileText } from 'lucide-react';
import Image from 'next/image';

interface FavoriteCardProps {
  favorite: Favorite;
  onRemove?: (favoriteId: string) => void;
  onReserve?: (bookId: string) => void;
  onAddNote?: (favoriteId: string) => void;
}

const statusConfig = {
  available: {
    label: 'Disponível',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  unavailable: {
    label: 'Indisponível',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  reserved: {
    label: 'Reservado',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
};

export function FavoriteCard({ favorite, onRemove, onReserve, onAddNote }: FavoriteCardProps) {
  const isAvailable = favorite.availableCopies > 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="flex flex-col h-full">
        {/* Book Cover */}
        <div className="relative h-64 bg-muted overflow-hidden">
          {favorite.bookCover ? (
            <Image
              src={favorite.bookCover}
              alt={favorite.bookTitle}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <BookOpen className="w-16 h-16" />
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge className={statusConfig[favorite.status].className}>
              {statusConfig[favorite.status].label}
            </Badge>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-sm font-medium">{favorite.rating}</span>
          </div>

          {/* Remove Button (appears on hover) */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onRemove?.(favorite.id)}
              className="shadow-lg"
            >
              <Heart className="w-4 h-4 mr-2 fill-current" />
              Remover
            </Button>
          </div>
        </div>

        {/* Book Info */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-semibold text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {favorite.bookTitle}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{favorite.bookAuthor}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              {favorite.categories.slice(0, 2).map((category) => (
                <Badge key={category} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
              {favorite.categories.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{favorite.categories.length - 2}
                </Badge>
              )}
            </div>

            {/* Notes Preview */}
            {favorite.notes && (
              <div className="bg-muted/50 rounded-md p-2 mb-3">
                <p className="text-xs text-muted-foreground italic line-clamp-2">
                  "{favorite.notes}"
                </p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="space-y-2 pt-3 border-t">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{favorite.publisher}</span>
              <span>{favorite.publishYear}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {favorite.availableCopies}/{favorite.totalCopies} disponíveis
              </span>
              <span className="text-muted-foreground flex items-center gap-1">
                <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                {new Date(favorite.addedDate).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-3 flex gap-2">
            {isAvailable ? (
              <Button
                className="flex-1"
                size="sm"
                onClick={() => onReserve?.(favorite.bookId)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Reservar
              </Button>
            ) : (
              <Button className="flex-1" size="sm" variant="outline" disabled>
                Indisponível
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddNote?.(favorite.id)}
            >
              <FileText className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}