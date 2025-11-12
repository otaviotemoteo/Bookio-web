// types/payments.ts

export interface Payment {
  id: string;
  type: 'fine' | 'membership' | 'replacement';
  description: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  relatedTo?: {
    type: 'loan' | 'reservation' | 'book';
    id: string;
    title: string;
  };
  paymentMethod?: 'credit_card' | 'debit_card' | 'pix' | 'boleto';
}

export interface PaymentFilters {
  status: 'all' | 'pending' | 'paid' | 'overdue';
  type: 'all' | 'fine' | 'membership' | 'replacement';
  search: string;
  sortBy: 'dueDate' | 'amount' | 'paidDate';
  sortOrder: 'asc' | 'desc';
}

export interface PaymentStats {
  totalPending: number;
  totalPaid: number;
  totalOverdue: number;
  pendingAmount: number;
  paidAmount: number;
  overdueAmount: number;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card';
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  isDefault: boolean;
}