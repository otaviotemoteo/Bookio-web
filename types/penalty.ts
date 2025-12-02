export interface CreatePenaltyRequest {
  readerId: string;
  loanId: string;
  amount: number;
  dueDate: string; // formato: "YYYY-MM-DD"
}

export interface Penalty {
  id: string;
  readerId: string;
  loanId: string;
  amount: number;
  paid: boolean;
  paymentLink?: string;
  createdAt: string;
}

export interface PenaltyWithReader extends Penalty {
  readerName: string;
}

export interface PenaltySimple {
  id: string;
  amount: number;
  paid: boolean;
  paymentLink?: string;
}

export interface PenaltyResponse {
  penality: Penalty; // API usa "penality" (com typo)
}

export interface PenaltiesListResponse {
  penalities: Penalty[];
}