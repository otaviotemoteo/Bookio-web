// types/reader/reservations.ts

export interface Reservation {
    id: string;
    bookId: string;
    bookTitle: string;
    bookAuthor: string;
    bookCover: string;
    isbn: string;
    reservationDate: string;
    expirationDate: string;
    status: 'pending' | 'available' | 'expired' | 'cancelled' | 'completed';
    position: number; // Posição na fila
    estimatedAvailability?: string;
    notificationSent: boolean;
  }
  
  export interface ReservationFilters {
    status: 'all' | 'pending' | 'available' | 'expired' | 'cancelled';
    search: string;
    sortBy: 'reservationDate' | 'expirationDate' | 'title' | 'position';
    sortOrder: 'asc' | 'desc';
  }
  
  export interface ReservationStats {
    totalReservations: number;
    pendingReservations: number;
    availableReservations: number;
    expiredReservations: number;
  }