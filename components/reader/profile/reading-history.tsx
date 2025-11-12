import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { ReadingHistory } from '../../../types/reader/profile';
import { Star, BookOpen, Calendar } from 'lucide-react';
import Image from 'next/image';

interface ReadingHistoryCardProps {
  history: ReadingHistory;
}

export function ReadingHistoryCard({ history }: ReadingHistoryCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex gap-4 p-4">
        {/* Book Cover */}
        <div className="relative w-20 h-28 flex-shrink-0 bg-muted rounded overflow-hidden">
          {history.bookCover ? (
            <Image
              src={history.bookCover}
              alt={history.bookTitle}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <BookOpen className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold line-clamp-1 mb-1">{history.bookTitle}</h4>
          <p className="text-sm text-muted-foreground mb-2">{history.bookAuthor}</p>

          {/* Rating */}
          {history.rating && (
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < history.rating!
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Review */}
          {history.review && (
            <p className="text-sm text-muted-foreground italic line-clamp-2 mb-2">
              "{history.review}"
            </p>
          )}

          {/* Date */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>Lido em {new Date(history.readDate).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}