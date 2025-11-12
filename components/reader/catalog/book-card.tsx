import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Book } from '../../../types/reader/catalog';
import { BookOpen, Heart, Calendar, Star, Eye } from 'lucide-react';
import Image from 'next/image';

interface BookCardProps {
  book: Book;
  onReserve?: (bookId: string) => void;
  onFavorite?: (bookId: string) => void;
  onViewDetails?: (bookId: string) => void;
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

export function BookCard({ book, onReserve, onFavorite, onViewDetails }: BookCardProps) {
  const isAvailable = book.availableCopies > 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="flex flex-col h-full">
        {/* Book Cover */}
        <div className="relative h-64 bg-muted overflow-hidden">
          {book.cover ? (
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <BookOpen className="w-16 h-16" />
            </div>
          )}
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onViewDetails?.(book.id)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Detalhes
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onFavorite?.(book.id)}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge className={statusConfig[book.status].className}>
              {statusConfig[book.status].label}
            </Badge>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-sm font-medium">{book.rating}</span>
          </div>
        </div>

        {/* Book Info */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-semibold text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {book.categories.slice(0, 2).map((category) => (
                <Badge key={category} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
              {book.categories.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{book.categories.length - 2}
                </Badge>
              )}
            </div>

            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {book.description}
            </p>
          </div>

          {/* Footer Info */}
          <div className="space-y-2 pt-3 border-t">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{book.publisher}</span>
              <span>{book.publishYear}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {book.availableCopies}/{book.totalCopies} disponíveis
              </span>
              <span className="text-muted-foreground flex items-center gap-1">
                <Star className="w-3 h-3" />
                {book.totalRatings} avaliações
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-3 flex gap-2">
            {isAvailable ? (
              <Button
                className="flex-1"
                size="sm"
                onClick={() => onReserve?.(book.id)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Reservar
              </Button>
            ) : (
              <Button
                className="flex-1"
                size="sm"
                variant="outline"
                disabled
              >
                Indisponível
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}