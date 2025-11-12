// types/profile.ts

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  address: Address;
  avatar?: string;
  memberSince: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ReadingHistory {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  rating?: number;
  review?: string;
  readDate: string;
  loanDate: string;
  returnDate: string;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    reservationAvailable: boolean;
    loanDueSoon: boolean;
    newBooks: boolean;
    newsletter: boolean;
  };
  privacy: {
    showProfile: boolean;
    showReadingHistory: boolean;
    showFavorites: boolean;
  };
  language: string;
  theme: 'light' | 'dark' | 'system';
}

export interface ActivityStats {
  totalBooksRead: number;
  totalLoans: number;
  totalReservations: number;
  currentStreak: number;
  favoriteCategory: string;
  averageRating: number;
}