export interface Reservation {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  readerId: string;
  readerName: string;
  reservationDate: string;
  status: "active" | "waiting" | "ready" | "completed" | "cancelled";
  expirationDate?: string;
  position?: number; // Para fila de espera
}

export const mockReservations: Reservation[] = [
  {
    id: "1",
    bookId: "b1",
    bookTitle: "1984",
    bookAuthor: "George Orwell",
    readerId: "1",
    readerName: "Ana Silva",
    reservationDate: "2024-10-01",
    status: "ready",
    expirationDate: "2024-10-10",
  },
  {
    id: "2",
    bookId: "b2",
    bookTitle: "O Senhor dos Anéis",
    bookAuthor: "J.R.R. Tolkien",
    readerId: "2",
    readerName: "Carlos Oliveira",
    reservationDate: "2024-10-03",
    status: "active",
  },
  {
    id: "3",
    bookId: "b3",
    bookTitle: "Dom Casmurro",
    bookAuthor: "Machado de Assis",
    readerId: "3",
    readerName: "Beatriz Santos",
    reservationDate: "2024-10-04",
    status: "waiting",
    position: 1,
  },
  {
    id: "4",
    bookId: "b3",
    bookTitle: "Dom Casmurro",
    bookAuthor: "Machado de Assis",
    readerId: "4",
    readerName: "Daniel Costa",
    reservationDate: "2024-10-05",
    status: "waiting",
    position: 2,
  },
  {
    id: "5",
    bookId: "b4",
    bookTitle: "Harry Potter e a Pedra Filosofal",
    bookAuthor: "J.K. Rowling",
    readerId: "5",
    readerName: "Eduarda Lima",
    reservationDate: "2024-10-06",
    status: "ready",
    expirationDate: "2024-10-12",
  },
  {
    id: "6",
    bookId: "b5",
    bookTitle: "A Revolução dos Bichos",
    bookAuthor: "George Orwell",
    readerId: "6",
    readerName: "Fernando Alves",
    reservationDate: "2024-10-07",
    status: "active",
  },
  {
    id: "7",
    bookId: "b2",
    bookTitle: "O Senhor dos Anéis",
    bookAuthor: "J.R.R. Tolkien",
    readerId: "7",
    readerName: "Gabriela Martins",
    reservationDate: "2024-10-08",
    status: "waiting",
    position: 1,
  },
  {
    id: "8",
    bookId: "b6",
    bookTitle: "Cem Anos de Solidão",
    bookAuthor: "Gabriel García Márquez",
    readerId: "8",
    readerName: "Hugo Pereira",
    reservationDate: "2024-09-28",
    status: "completed",
  },
];