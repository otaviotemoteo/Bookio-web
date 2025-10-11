/* Status possíveis de uma reserva */
export type ReservationStatus = 
  | "active"      // Reserva ativa, aguardando disponibilidade
  | "ready"       // Livro disponível para retirada
  | "waiting"     // Na fila de espera
  | "completed"   // Reserva concluída
  | "cancelled";  // Reserva cancelada

/* Prioridade da reserva (para sistema de fila inteligente) */
export type ReservationPriority = "normal" | "high" | "urgent";

/* Interface principal de Reserva */
export interface Reservation {
  id: string;
  
  // Relacionamentos
  bookId: string;
  readerId: string;
  
  // Informações do livro (desnormalizado para performance)
  bookTitle: string;
  bookAuthor: string;
  bookCover?: string;
  
  // Informações do leitor (desnormalizado)
  readerName: string;
  readerEmail?: string;
  
  // Status e controle
  status: ReservationStatus;
  priority?: ReservationPriority;
  
  // Datas
  reservationDate: string; // ISO string
  expirationDate?: string; // Data limite para retirada
  readyDate?: string;      // Quando ficou pronto
  completedDate?: string;  // Quando foi concluído
  cancelledDate?: string;  // Quando foi cancelado
  
  // Fila de espera
  position?: number;        // Posição na fila (1, 2, 3...)
  queueNotified?: boolean;  // Se já foi notificado que chegou sua vez
  
  // Observações
  notes?: string;           // Observações do bibliotecário
  
  // Auditoria
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;       // ID do bibliotecário que criou
}

/* DTO para criar nova reserva */
export interface CreateReservationDTO {
  bookId: string;
  readerId: string;
  priority?: ReservationPriority;
  notes?: string;
}

/* DTO para atualizar reserva */
export interface UpdateReservationDTO {
  status?: ReservationStatus;
  expirationDate?: string;
  position?: number;
  notes?: string;
}

/* Filtros para busca de reservas */
export interface ReservationFilters {
  status?: ReservationStatus | "all";
  readerId?: string;
  bookId?: string;
  dateFrom?: string;
  dateTo?: string;
  searchTerm?: string;
}

/* Estatísticas de reservas */
export interface ReservationStats {
  active: number;
  ready: number;
  waiting: number;
  completed: number;
  cancelled: number;
  total: number;
  averageWaitTime?: number; // Em dias
}

/* Item da fila de espera */
export interface QueueItem {
  reservationId: string;
  readerId: string;
  readerName: string;
  position: number;
  waitingSince: string;
  notified: boolean;
}


 /*Resposta da API com paginação */
export interface ReservationListResponse {
  reservations: Reservation[];
  total: number;
  page: number;
  pageSize: number;
  stats?: ReservationStats;
}