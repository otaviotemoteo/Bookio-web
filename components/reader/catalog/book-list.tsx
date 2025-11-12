import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Book } from '../../../types/reader/catalog';
import { BookOpen, Heart, Calendar, Star, Eye } from 'lucide-react';
import Image from 'next/image';

interface BookListItemProps {
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

export function BookListItem({ book, onReserve, onFavorite, onViewDetails }: BookListItemProps) {
  const isAvailable = book.availableCopies > 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex gap-4 p-4">
        {/* Book Cover */}
        <div className="relative w-32 h-48 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
          {book.cover ? (
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <BookOpen className="w-12 h-12" />
            </div>
          )}
          
          {/* Rating Badge */}
          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-xs font-medium">{book.rating}</span>
          </div>
        </div>

        {/* Book Info */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold line-clamp-1 mb-1">
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
            </div>
            <Badge className={statusConfig[book.status].className}>
              {statusConfig[book.status].label}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {book.categories.map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {book.description}
          </p>

          {/* Book Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
            <div>
              <span className="text-muted-foreground">Editora:</span>
              <p className="font-medium">{book.publisher}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Ano:</span>
              <p className="font-medium">{book.publishYear}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Páginas:</span>
              <p className="font-medium">{book.pages}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Idioma:</span>
              <p className="font-medium">{book.language}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">
                {book.availableCopies}/{book.totalCopies} disponíveis
              </span>
              <span className="text-muted-foreground flex items-center gap-1">
                <Star className="w-3 h-3" />
                {book.totalRatings} avaliações
              </span>
              <span className="text-muted-foreground">ISBN: {book.isbn}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewDetails?.(book.id)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Detalhes
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onFavorite?.(book.id)}
              >
                <Heart className="w-4 h-4" />
              </Button>
              {isAvailable ? (
                <Button size="sm" onClick={() => onReserve?.(book.id)}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Reservar
                </Button>
              ) : (
                <Button size="sm" variant="outline" disabled>
                  Indisponível
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}