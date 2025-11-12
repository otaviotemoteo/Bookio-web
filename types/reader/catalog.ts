// types/catalog.ts

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publishYear: number;
  pages: number;
  language: string;
  cover: string;
  description: string;
  categories: string[];
  rating: number;
  totalRatings: number;
  availableCopies: number;
  totalCopies: number;
  status: 'available' | 'unavailable' | 'reserved';
}

export interface CatalogFilters {
  search: string;
  category: string;
  status: 'all' | 'available' | 'unavailable' | 'reserved';
  sortBy: 'title' | 'author' | 'publishYear' | 'rating';
  sortOrder: 'asc' | 'desc';
  language: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface CatalogStats {
  totalBooks: number;
  availableBooks: number;
  categories: number;
  newArrivals: number;
}