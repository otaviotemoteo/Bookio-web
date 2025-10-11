// types/reader/loans.ts

export interface Loan {
    id: string;
    bookId: string;
    bookTitle: string;
    bookAuthor: string;
    bookCover: string;
    isbn: string;
    loanDate: string;
    dueDate: string;
    returnDate?: string;
    status: 'active' | 'overdue' | 'returned' | 'renewed';
    renewalCount: number;
    maxRenewals: number;
    fine?: number;
  }
  
  export interface LoanFilters {
    status: 'all' | 'active' | 'overdue' | 'returned';
    search: string;
    sortBy: 'dueDate' | 'loanDate' | 'title';
    sortOrder: 'asc' | 'desc';
  }
  
  export interface LoanStats {
    totalLoans: number;
    activeLoans: number;
    overdueLoans: number;
    totalFines: number;
  }