// types/reader/dashboard.ts

export interface UserStats {
    activeLoans: number;
    pendingReservations: number;
    favoriteBooks: number;
    readingHistory: number;
  }
  
  export interface RecentActivity {
    id: string;
    type: 'loan' | 'reservation' | 'return' | 'favorite';
    bookTitle: string;
    bookAuthor: string;
    date: string;
    status: 'active' | 'pending' | 'completed' | 'overdue';
  }
  
  export interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon: string;
    href: string;
    color: string;
  }
  
  export interface Recommendation {
    id: string;
    title: string;
    author: string;
    cover: string;
    rating: number;
    genre: string;
  }