export type LoanStatus = "ACTIVE" | "RETURNED" | "OVERDUE";

export interface CreateLoanRequest {
  bookId: string;
  readerId: string;
  returnDate: string; // formato: "YYYY-MM-DD"
}

export interface Loan {
  id: string;
  bookId: string;
  readerId: string;
  returnDate: string;
  dueDate: string;
  status: LoanStatus;
  createdAt?: string;
}

export interface LoanSimple {
  id: string;
  status: LoanStatus;
}

export interface LoanResponse {
  loan: Loan;
}

export interface LoansListResponse {
  loans: Loan[];
}

export interface LoanStatusResponse {
  loan: LoanSimple;
  isOverdue: boolean;
  daysOverdue: number;
}