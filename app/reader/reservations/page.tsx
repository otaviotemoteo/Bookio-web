'use client';

import { useState, useMemo } from 'react';
import { ReservationCard } from '../../../components/reader/reservations/reservation-card-props';
import { ReservationFilters } from '../../../components/reader/reservations/reservation-filter-props';
import { Card } from '../../../components/ui/card';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { ReservationFilters as ReservationFiltersType } from '../../../types/reader/reservations';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { mockReservations, mockReservationStats } from '../../../data/reader/mock-reservations'

export default function ReservationsPage() {
  const [filters, setFilters] = useState<ReservationFiltersType>({
    status: 'all',
    search: '',
    sortBy: 'reservationDate',
    sortOrder: 'desc',
  });

  // Filter and sort reservations
  const filteredReservations = useMemo(() => {
    let result = [...mockReservations];

    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(reservation => reservation.status === filters.status);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        reservation =>
          reservation.bookTitle.toLowerCase().includes(searchLower) ||
          reservation.bookAuthor.toLowerCase().includes(searchLower) ||
          reservation.isbn.includes(searchLower)
      );
    }

    // Sort
    result.sort((a, b) => {
      let compareValue = 0;

      switch (filters.sortBy) {
        case 'reservationDate':
          compareValue = new Date(a.reservationDate).getTime() - new Date(b.reservationDate).getTime();
          break;
        case 'expirationDate':
          compareValue = new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
          break;
        case 'title':
          compareValue = a.bookTitle.localeCompare(b.bookTitle);
          break;
        case 'position':
          compareValue = a.position - b.position;
          break;
      }

      return filters.sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return result;
  }, [filters]);

  const handleCancel = (reservationId: string) => {
    console.log('Cancelando reserva:', reservationId);
    // Implementar lógica de cancelamento
  };

  const handleCheckout = (reservationId: string) => {
    console.log('Retirando livro:', reservationId);
    // Implementar lógica de retirada
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Minhas Reservas</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie suas reservas de livros e acompanhe a disponibilidade
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-100">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{mockReservationStats.totalReservations}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Aguardando</p>
              <p className="text-2xl font-bold">{mockReservationStats.pendingReservations}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Disponíveis</p>
              <p className="text-2xl font-bold">{mockReservationStats.availableReservations}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-red-100">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expirados</p>
              <p className="text-2xl font-bold">{mockReservationStats.expiredReservations}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Available Books Alert */}
      {mockReservationStats.availableReservations > 0 && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Você tem {mockReservationStats.availableReservations} livro(s) disponível(is) para retirada!
            Por favor, retire-os na biblioteca antes da data de expiração.
          </AlertDescription>
        </Alert>
      )}

      {/* Expired Books Alert */}
      {mockReservationStats.expiredReservations > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Você tem {mockReservationStats.expiredReservations} reserva(s) expirada(s).
            Essas reservas foram canceladas automaticamente.
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <ReservationFilters filters={filters} onFilterChange={setFilters} />

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma reserva encontrada</h3>
            <p className="text-muted-foreground">
              {filters.search || filters.status !== 'all'
                ? 'Tente ajustar os filtros para encontrar o que procura.'
                : 'Você ainda não tem nenhuma reserva ativa. Visite o catálogo para reservar livros!'}
            </p>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Exibindo {filteredReservations.length} de {mockReservations.length} reserva(s)
              </p>
            </div>
            {filteredReservations.map(reservation => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onCancel={handleCancel}
                onCheckout={handleCheckout}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}