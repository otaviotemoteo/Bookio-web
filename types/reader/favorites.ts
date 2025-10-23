// types/favorites.ts

export interface Favorite {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  isbn: string;
  publisher: string;
  publishYear: number;
  categories: string[];
  rating: number;
  addedDate: string;
  notes?: string;
  availableCopies: number;
  totalCopies: number;
  status: 'available' | 'unavailable' | 'reserved';
}

export interface FavoriteFilters {
  search: string;
  category: string;
  status: 'all' | 'available' | 'unavailable';
  sortBy: 'addedDate' | 'title' | 'author' | 'rating';
  sortOrder: 'asc' | 'desc';
}

export interface FavoriteStats {
  totalFavorites: number;
  availableFavorites: number;
  categories: number;
  averageRating: number;
}

export interface ReadingList {
  id: string;
  name: string;
  description?: string;
  bookIds: string[];
  createdAt: string;
  updatedAt: string;
}