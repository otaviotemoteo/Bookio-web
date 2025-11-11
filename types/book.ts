export type BookGender =
  | "Fiction"
  | "NonFiction"
  | "Fantasy"
  | "ScienceFiction"
  | "Mystery"
  | "Romance"
  | "Thriller"
  | "Horror"
  | "Biography"
  | "History"
  | "Poetry"
  | "SelfHelp";

export interface CreateBookRequest {
  libraryId: string;
  author: string;
  title: string;
  gender: BookGender;
  year: string; // formato: "YYYY-MM-DD"
  available: number;
}

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  gender?: BookGender;
  year?: string;
  available?: number;
}
export interface Book {
  id: number;
  title: string;
  author: string;
  gender?: BookGender;
  year?: string;
  available: number;
  imageUrl?: string;
}

export interface BookApiResponse {
  id: number;
  title: string;
  author: string;
  available: number;
  gender?: BookGender;
  year?: string;
  imageUrl?: string;
}

export interface BookResponse {
  book: Book;
}

export interface BooksListResponse {
  books: Book[];
}

export interface BookSimple {
  id: number;
  title: string;
  author: string;
  available: number;
}

export interface MostBorrowedBook {
  bookId: string;
  title: string;
  author: string;
  totalLoans: number;
}

export interface MostBorrowedBooksResponse {
  books: MostBorrowedBook[];
}
