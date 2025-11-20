export interface Penalty {
  id: string;
  loanId: string;
  readerId: string;
  readerName: string;
  bookTitle?: string;
  amount: number;
  paid: boolean;
  paymentLink?: string;
  createdAt: string;
  dueDate?: string;
}

export interface PenaltyStats {
  total: number;
  paid: number;
  pending: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
}

export interface PenaltyResponse {
  penalty: {
    id: string;
    amount: number;
    paid: boolean;
    paymentLink: string;
  };
}

export interface PenaltyDetailResponse {
  penalty: {
    id: string;
    loanId: string;
    amount: number;
    paid: boolean;
    paymentLink: string;
    createdAt: string;
  };
}

export interface PenaltyListResponse {
  penalties: Array<{
    id: string;
    amount: number;
    paid: boolean;
    paymentLink: string;
  }>;
}

export interface CreatePenaltyRequest {
  readerId: string;
  loanId: string;
  amount: number;
  dueDate: string;
}
