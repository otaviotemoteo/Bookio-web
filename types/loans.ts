export type LoanStatus = 'active' | 'overdue' | 'returned' | 'pending';

export interface Loan {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover?: string;
  userId: string;
  userName: string;
  userEmail: string;
  loanDate: string;
  dueDate: string;
  returnDate?: string;
  status: LoanStatus;
  renewalCount: number;
  fine?: number;
}

export interface LoanFormData {
  userId: string;
  bookId: string;
  loanDate: string;
  dueDate: string;
}

export interface ReturnFormData {
  loanId: string;
  returnDate: string;
  condition: 'good' | 'damaged' | 'lost';
  notes?: string;
}