export interface CreatePenaltyRequest {
  readerId: string;
  loanId: string;
  amount: number;
  dueDate: string; // formato: "YYYY-MM-DD"
}

export interface Penalty {
  id: string;
  loanId: string;
  amount: number;
  paid: boolean;
  paymentLink?: string;
  createdAt: string;
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
  penalities: PenaltySimple[]; // API usa "penalities" (com typo)
}
