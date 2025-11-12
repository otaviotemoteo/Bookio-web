import { UserProfile, ReadingHistory, UserPreferences, ActivityStats } from '../../types/reader/profile';

export const mockUserProfile: UserProfile = {
  id: 'user-001',
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '(16) 99999-9999',
  cpf: '123.456.789-00',
  birthDate: '1990-05-15',
  address: {
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 45',
    neighborhood: 'Centro',
    city: 'São Carlos',
    state: 'SP',
    zipCode: '13560-000',
  },
  avatar: '/placeholder-avatar.jpg',
  memberSince: '2022-01-15',
  membershipType: 'premium',
  membershipExpiry: '2025-01-15',
};

export const mockReadingHistory: ReadingHistory[] = [
  {
    id: '1',
    bookId: 'b1',
    bookTitle: 'Código Limpo: Habilidades Práticas do Agile Software',
    bookAuthor: 'Robert C. Martin',
    bookCover: '/placeholder-book-1.jpg',
    rating: 5,
    review: 'Excelente livro! Mudou minha forma de programar.',
    readDate: '2024-08-20',
    loanDate: '2024-07-15',
    returnDate: '2024-08-20',
  },
  {
    id: '2',
    bookId: 'b4',
    bookTitle: 'Refactoring: Improving the Design of Existing Code',
    bookAuthor: 'Martin Fowler',
    bookCover: '/placeholder-book-4.jpg',
    rating: 5,
    review: 'Referência essencial sobre refatoração.',
    readDate: '2024-09-08',
    loanDate: '2024-08-10',
    returnDate: '2024-09-08',
  },
  {
    id: '3',
    bookId: 'b7',
    bookTitle: 'JavaScript: The Good Parts',
    bookAuthor: 'Douglas Crockford',
    bookCover: '/placeholder-book-7.jpg',
    rating: 4,
    readDate: '2024-07-05',
    loanDate: '2024-06-05',
    returnDate: '2024-07-05',
  },
  {
    id: '4',
    bookId: 'b11',
    bookTitle: 'Test Driven Development: By Example',
    bookAuthor: 'Kent Beck',
    bookCover: '/placeholder-book-11.jpg',
    rating: 5,
    review: 'Aprendi muito sobre TDD com este livro.',
    readDate: '2024-06-15',
    loanDate: '2024-05-20',
    returnDate: '2024-06-15',
  },
  {
    id: '5',
    bookId: 'b5',
    bookTitle: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    bookAuthor: 'Gang of Four',
    bookCover: '/placeholder-book-5.jpg',
    rating: 5,
    review: 'Clássico que todo desenvolvedor deve ler!',
    readDate: '2024-05-10',
    loanDate: '2024-04-01',
    returnDate: '2024-05-10',
  },
  {
    id: '6',
    bookId: 'b6',
    bookTitle: 'The Pragmatic Programmer',
    bookAuthor: 'Andrew Hunt, David Thomas',
    bookCover: '/placeholder-book-6.jpg',
    rating: 4,
    readDate: '2024-04-20',
    loanDate: '2024-03-15',
    returnDate: '2024-04-20',
  },
];

export const mockUserPreferences: UserPreferences = {
  notifications: {
    email: true,
    sms: false,
    push: true,
    reservationAvailable: true,
    loanDueSoon: true,
    newBooks: false,
    newsletter: true,
  },
  privacy: {
    showProfile: true,
    showReadingHistory: false,
    showFavorites: true,
  },
  language: 'pt-BR',
  theme: 'system',
};

export const mockActivityStats: ActivityStats = {
  totalBooksRead: mockReadingHistory.length,
  totalLoans: 47,
  totalReservations: 12,
  currentStreak: 15,
  favoriteCategory: 'Programação',
  averageRating: Number(
    (mockReadingHistory.filter(h => h.rating).reduce((sum, h) => sum + (h.rating || 0), 0) / 
    mockReadingHistory.filter(h => h.rating).length).toFixed(1)
  ),
};