import { UserStats, RecentActivity, QuickAction, Recommendation } from '../../types/reader/dashboard';

export const mockUserStats: UserStats = {
  activeLoans: 3,
  pendingReservations: 2,
  favoriteBooks: 15,
  readingHistory: 47,
};

export const mockRecentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'loan',
    bookTitle: 'Código Limpo',
    bookAuthor: 'Robert C. Martin',
    date: '2024-10-01',
    status: 'active',
  },
  {
    id: '2',
    type: 'reservation',
    bookTitle: 'Domain-Driven Design',
    bookAuthor: 'Eric Evans',
    date: '2024-09-28',
    status: 'pending',
  },
  {
    id: '3',
    type: 'return',
    bookTitle: 'Clean Architecture',
    bookAuthor: 'Robert C. Martin',
    date: '2024-09-25',
    status: 'completed',
  },
  {
    id: '4',
    type: 'favorite',
    bookTitle: 'Refactoring',
    bookAuthor: 'Martin Fowler',
    date: '2024-09-20',
    status: 'completed',
  },
  {
    id: '5',
    type: 'loan',
    bookTitle: 'Design Patterns',
    bookAuthor: 'Gang of Four',
    date: '2024-09-15',
    status: 'overdue',
  },
];

export const mockQuickActions: QuickAction[] = [
  {
    id: '1',
    title: 'Catálogo',
    description: 'Buscar livros',
    icon: 'search',
    href: '/reader/catalog',
    color: 'hover:border-blue-500',
  },
  {
    id: '2',
    title: 'Empréstimos',
    description: 'Ver meus livros',
    icon: 'loans',
    href: '/reader/loans',
    color: 'hover:border-green-500',
  },
  {
    id: '3',
    title: 'Reservas',
    description: 'Gerenciar reservas',
    icon: 'reservations',
    href: '/reader/reservations',
    color: 'hover:border-yellow-500',
  },
  {
    id: '4',
    title: 'Favoritos',
    description: 'Minha lista',
    icon: 'favorites',
    href: '/reader/favorites',
    color: 'hover:border-red-500',
  },
  {
    id: '5',
    title: 'Pagamentos',
    description: 'Ver pendências',
    icon: 'payments',
    href: '/reader/payments',
    color: 'hover:border-purple-500',
  },
  {
    id: '6',
    title: 'Perfil',
    description: 'Meus dados',
    icon: 'profile',
    href: '/reader/profile',
    color: 'hover:border-indigo-500',
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'O Programador Pragmático',
    author: 'Andrew Hunt, David Thomas',
    cover: '/placeholder-book-rec-1.jpg',
    rating: 4.8,
    genre: 'Programação',
  },
  {
    id: '2',
    title: 'Padrões de Projeto',
    author: 'Erich Gamma',
    cover: '/placeholder-book-rec-2.jpg',
    rating: 4.7,
    genre: 'Arquitetura de Software',
  },
  {
    id: '3',
    title: 'Introdução aos Algoritmos',
    author: 'Thomas H. Cormen',
    cover: '/placeholder-book-rec-3.jpg',
    rating: 4.9,
    genre: 'Algoritmos',
  },
  {
    id: '4',
    title: 'Use a Cabeça! Padrões de Projetos',
    author: 'Eric Freeman',
    cover: '/placeholder-book-rec-4.jpg',
    rating: 4.6,
    genre: 'Design Patterns',
  },
];