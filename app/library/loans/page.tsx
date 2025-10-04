'use client';

import { useState, useMemo } from 'react';
import { LoansTable } from '../../../components/library/loans/loans-table';
import { LoansStats } from '../../../components/library/loans/loan-stats';
import { LoansFilters } from '../../../components/library/loans/loan-filters';
import { NewLoanDialog } from '../../../components/library/loans/new-loan-dialog';
import { ReturnDialog } from '../../../components/library/loans/return-dialog';
import { mockLoans } from '../../../data/library/mock-loans';
import { Loan, LoanFormData, ReturnFormData, LoanStatus } from '../../../types/loans';
import { useToast } from '../../../components/ui/use-toast';

export default function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>(mockLoans);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LoanStatus | 'all'>('all');
  const [returnDialog, setReturnDialog] = useState<{
    open: boolean;
    loanId: string;
    bookTitle: string;
  }>({ open: false, loanId: '', bookTitle: '' });
  
  const { toast } = useToast();

  // Filtrar empréstimos
  const filteredLoans = useMemo(() => {
    return loans.filter(loan => {
      const matchesSearch = 
        loan.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [loans, searchTerm, statusFilter]);

  // Calcular estatísticas
  const stats = useMemo(() => {
    const activeLoans = loans.filter(l => l.status === 'active').length;
    const overdueLoans = loans.filter(l => l.status === 'overdue').length;
    const today = new Date().toISOString().split('T')[0];
    const returnedToday = loans.filter(l => l.returnDate === today).length;
    const totalFines = loans.reduce((sum, l) => sum + (l.fine || 0), 0);

    return { activeLoans, overdueLoans, returnedToday, totalFines };
  }, [loans]);

  // Registrar novo empréstimo
  const handleNewLoan = (data: LoanFormData) => {
    const newLoan: Loan = {
      id: `loan-${Date.now()}`,
      bookId: data.bookId,
      bookTitle: 'Livro Emprestado',
      bookAuthor: 'Autor',
      userId: data.userId,
      userName: 'Usuário',
      userEmail: 'usuario@email.com',
      loanDate: data.loanDate,
      dueDate: data.dueDate,
      status: 'active',
      renewalCount: 0
    };

    setLoans([newLoan, ...loans]);
    toast({
      title: 'Empréstimo registrado!',
      description: 'O empréstimo foi registrado com sucesso.',
    });
  };

  // Renovar empréstimo
  const handleRenew = (loanId: string) => {
    setLoans(loans.map(loan => {
      if (loan.id === loanId) {
        const newDueDate = new Date(loan.dueDate);
        newDueDate.setDate(newDueDate.getDate() + 15);
        
        return {
          ...loan,
          dueDate: newDueDate.toISOString().split('T')[0],
          renewalCount: loan.renewalCount + 1
        };
      }
      return loan;
    }));

    toast({
      title: 'Empréstimo renovado!',
      description: 'O prazo de devolução foi estendido por 15 dias.',
    });
  };

  // Abrir dialog de devolução
  const handleOpenReturn = (loanId: string) => {
    const loan = loans.find(l => l.id === loanId);
    if (loan) {
      setReturnDialog({
        open: true,
        loanId: loan.id,
        bookTitle: loan.bookTitle
      });
    }
  };

  // Registrar devolução
  const handleReturn = (data: ReturnFormData) => {
    setLoans(loans.map(loan => {
      if (loan.id === data.loanId) {
        return {
          ...loan,
          status: 'returned' as LoanStatus,
          returnDate: data.returnDate
        };
      }
      return loan;
    }));

    toast({
      title: 'Devolução registrada!',
      description: 'O livro foi devolvido com sucesso.',
    });
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Empréstimos e Devoluções</h1>
          <p className="text-gray-500 mt-1">
            Gerencie os empréstimos e devoluções de livros
          </p>
        </div>
        <NewLoanDialog onSubmit={handleNewLoan} />
      </div>

      <LoansStats {...stats} />

      <div className="space-y-4">
        <LoansFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <LoansTable
          loans={filteredLoans}
          onReturn={handleOpenReturn}
          onRenew={handleRenew}
          hasFilters={searchTerm !== '' || statusFilter !== 'all'}
        />
      </div>

      <ReturnDialog
        open={returnDialog.open}
        onOpenChange={(open) => setReturnDialog({ ...returnDialog, open })}
        loanId={returnDialog.loanId}
        bookTitle={returnDialog.bookTitle}
        onSubmit={handleReturn}
      />
    </div>
  );
}