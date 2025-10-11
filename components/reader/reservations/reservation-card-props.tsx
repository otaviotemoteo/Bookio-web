import { Card } from '../..//ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Reservation } from '../../../types/reader/reservations';
import { Calendar, Clock, AlertCircle, CheckCircle, X, BookOpen } from 'lucide-react';
import Image from 'next/image';

interface ReservationCardProps {
  reservation: Reservation;
  onCancel?: (reservationId: string) => void;
  onCheckout?: (reservationId: string) => void;
}

const statusConfig = {
  pending: {
    label: 'Aguardando',
    icon: Clock,
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  available: {
    label: 'Disponível',
    icon: CheckCircle,
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  expired: {
    label: 'Expirado',
    icon: AlertCircle,
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  cancelled: {
    label: 'Cancelado',
    icon: X,
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
  completed: {
    label: 'Concluído',
    icon: CheckCircle,
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
};

export function ReservationCard({ reservation, onCancel, onCheckout }: ReservationCardProps) {
  const config = statusConfig[reservation.status];
  const StatusIcon = config.icon;
  
  const daysUntilExpiration = Math.ceil(
    (new Date(reservation.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const isExpiringSoon = daysUntilExpiration <= 3 && daysUntilExpiration > 0;
  const canCancel = reservation.status === 'pending' || reservation.status === 'available';
  const canCheckout = reservation.status === 'available';

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-4 p-6">
        {/* Book Cover */}
        <div className="relative w-full md:w-32 h-48 md:h-48 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
          {reservation.bookCover ? (
            <Image
              src={reservation.bookCover}
              alt={reservation.bookTitle}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <BookOpen className="w-12 h-12" />
            </div>
          )}
          
          {/* Position Badge */}
          {reservation.status === 'pending' && reservation.position > 0 && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
              #{reservation.position} na fila
            </div>
          )}
        </div>

        {/* Reservation Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate">{reservation.bookTitle}</h3>
              <p className="text-sm text-muted-foreground truncate">{reservation.bookAuthor}</p>
              <p className="text-xs text-muted-foreground mt-1">ISBN: {reservation.isbn}</p>
            </div>
            <Badge className={config.className}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {config.label}
            </Badge>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Reservado em:</span>
              <span className="font-medium">
                {new Date(reservation.reservationDate).toLocaleDateString('pt-BR')}
              </span>
            </div>

            {reservation.status === 'pending' && reservation.estimatedAvailability && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Previsão de disponibilidade:</span>
                <span className="font-medium">
                  {new Date(reservation.estimatedAvailability).toLocaleDateString('pt-BR')}
                </span>
              </div>
            )}

            {(reservation.status === 'available' || isExpiringSoon) && (
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className={`w-4 h-4 ${isExpiringSoon ? 'text-yellow-600' : 'text-muted-foreground'}`} />
                <span className="text-muted-foreground">Expira em:</span>
                <span className={`font-medium ${isExpiringSoon ? 'text-yellow-600' : ''}`}>
                  {new Date(reservation.expirationDate).toLocaleDateString('pt-BR')}
                  {isExpiringSoon && ` (${daysUntilExpiration} dias)`}
                </span>
              </div>
            )}

            {reservation.status === 'expired' && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">
                  Expirou em {new Date(reservation.expirationDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
            )}
          </div>

          {/* Status Messages */}
          {reservation.status === 'available' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-green-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">
                  Seu livro está disponível! Retire-o na biblioteca antes da data de expiração.
                </span>
              </p>
            </div>
          )}

          {reservation.status === 'pending' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">
                Você será notificado quando o livro estiver disponível para retirada.
                {reservation.position > 0 && ` Há ${reservation.position} pessoa(s) na sua frente.`}
              </p>
            </div>
          )}

          {isExpiringSoon && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-yellow-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Atenção! Sua reserva expira em breve. Retire o livro o quanto antes.</span>
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {canCheckout && onCheckout && (
              <Button
                size="sm"
                onClick={() => onCheckout(reservation.id)}
                className="flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Retirar Livro
              </Button>
            )}
            {canCancel && onCancel && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onCancel(reservation.id)}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancelar Reserva
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}