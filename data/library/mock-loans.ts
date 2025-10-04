import { Loan }  from '../../types/loans';

export const mockLoans: Loan[] = [
  {
    id: '1',
    bookId: 'book-1',
    bookTitle: 'Clean Code',
    bookAuthor: 'Robert C. Martin',
    bookCover: 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg',
    userId: 'user-1',
    userName: 'João Silva',
    userEmail: 'joao.silva@email.com',
    loanDate: '2025-09-15',
    dueDate: '2025-10-15',
    status: 'overdue',
    renewalCount: 0,
    fine: 15.00
  },
  {
    id: '2',
    bookId: 'book-2',
    bookTitle: 'Design Patterns',
    bookAuthor: 'Gang of Four',
    userId: 'user-2',
    userName: 'Maria Santos',
    userEmail: 'maria.santos@email.com',
    loanDate: '2025-09-20',
    dueDate: '2025-10-20',
    status: 'active',
    renewalCount: 1
  },
  {
    id: '3',
    bookId: 'book-3',
    bookTitle: 'The Pragmatic Programmer',
    bookAuthor: 'Andrew Hunt',
    userId: 'user-3',
    userName: 'Pedro Oliveira',
    userEmail: 'pedro.oliveira@email.com',
    loanDate: '2025-09-25',
    dueDate: '2025-10-25',
    status: 'active',
    renewalCount: 0
  },
  {
    id: '4',
    bookId: 'book-4',
    bookTitle: 'Refactoring',
    bookAuthor: 'Martin Fowler',
    userId: 'user-4',
    userName: 'Ana Costa',
    userEmail: 'ana.costa@email.com',
    loanDate: '2025-08-10',
    dueDate: '2025-09-10',
    returnDate: '2025-09-08',
    status: 'returned',
    renewalCount: 0
  },
  {
    id: '5',
    bookId: 'book-5',
    bookTitle: 'JavaScript: The Good Parts',
    bookAuthor: 'Douglas Crockford',
    userId: 'user-5',
    userName: 'Carlos Ferreira',
    userEmail: 'carlos.ferreira@email.com',
    loanDate: '2025-09-28',
    dueDate: '2025-10-28',
    status: 'active',
    renewalCount: 0
  },
  {
    id: '66',
    bookId: 'book-6',
    bookTitle: 'Domain-Driven Design',
    bookAuthor: 'Eric Evans',
    userId: 'user-6',
    userName: 'Beatriz Lima',
    userEmail: 'beatriz.lima@email.com',
    loanDate: '2025-09-10',
    dueDate: '2025-10-10',
    status: 'overdue',
    renewalCount: 2,
    fine: 8.50
  }
];