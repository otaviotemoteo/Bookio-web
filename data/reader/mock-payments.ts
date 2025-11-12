import { Payment, PaymentStats, PaymentMethod } from '../../types/reader/payments';

export const mockPayments: Payment[] = [
  {
    id: '1',
    type: 'fine',
    description: 'Multa por atraso na devolução - 15 dias',
    amount: 45.00,
    dueDate: '2024-10-15',
    status: 'overdue',
    relatedTo: {
      type: 'loan',
      id: 'loan-5',
      title: 'Design Patterns: Elements of Reusable',
    },
  },
  {
    id: '2',
    type: 'fine',
    description: 'Multa por atraso na devolução - 5 dias',
    amount: 15.50,
    dueDate: '2024-10-20',
    status: 'pending',
    relatedTo: {
      type: 'loan',
      id: 'loan-2',
      title: 'Clean Architecture',
    },
  },
  {
    id: '3',
    type: 'replacement',
    description: 'Reposição de livro danificado - The Pragmatic Programmer',
    amount: 89.90,
    dueDate: '2024-11-01',
    status: 'pending',
    relatedTo: {
      type: 'book',
      id: 'b6',
      title: 'The Pragmatic Programmer',
    },
  },
  {
    id: '4',
    type: 'fine',
    description: 'Multa por atraso na devolução - 8 dias',
    amount: 24.00,
    dueDate: '2024-09-10',
    paidDate: '2024-09-12',
    status: 'paid',
    paymentMethod: 'pix',
    relatedTo: {
      type: 'loan',
      id: 'loan-10',
      title: 'JavaScript: The Good Parts',
    },
  },
  {
    id: '5',
    type: 'fine',
    description: 'Multa por atraso na devolução - 3 dias',
    amount: 9.00,
    dueDate: '2024-08-05',
    paidDate: '2024-08-04',
    status: 'paid',
    paymentMethod: 'debit_card',
    relatedTo: {
      type: 'loan',
      id: 'loan-8',
      title: 'Refactoring',
    },
  },
  {
    id: '6',
    type: 'fine',
    description: 'Multa por atraso na devolução - 12 dias',
    amount: 36.00,
    dueDate: '2024-07-20',
    paidDate: '2024-07-22',
    status: 'paid',
    paymentMethod: 'pix',
    relatedTo: {
      type: 'loan',
      id: 'loan-12',
      title: 'Domain-Driven Design',
    },
  },
  {
    id: '7',
    type: 'fine',
    description: 'Multa por atraso na devolução - 2 dias',
    amount: 6.00,
    dueDate: '2024-10-25',
    status: 'pending',
    relatedTo: {
      type: 'loan',
      id: 'loan-15',
      title: 'Test Driven Development',
    },
  },
  {
    id: '8',
    type: 'replacement',
    description: 'Reposição de livro perdido - Clean Code',
    amount: 95.00,
    dueDate: '2024-09-15',
    paidDate: '2024-09-14',
    status: 'paid',
    paymentMethod: 'credit_card',
    relatedTo: {
      type: 'book',
      id: 'b1',
      title: 'Código Limpo',
    },
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit_card',
    cardNumber: '**** **** **** 1234',
    cardHolderName: 'João Silva',
    expiryDate: '12/2026',
    isDefault: true,
  },
  {
    id: '2',
    type: 'debit_card',
    cardNumber: '**** **** **** 5678',
    cardHolderName: 'João Silva',
    expiryDate: '08/2025',
    isDefault: false,
  },
];

export const mockPaymentStats: PaymentStats = {
  totalPending: mockPayments.filter(p => p.status === 'pending').length,
  totalPaid: mockPayments.filter(p => p.status === 'paid').length,
  totalOverdue: mockPayments.filter(p => p.status === 'overdue').length,
  pendingAmount: mockPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0),
  paidAmount: mockPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0),
  overdueAmount: mockPayments
    .filter(p => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0),
};