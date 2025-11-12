'use client';

import { useState, useMemo } from 'react';
import { LoanCard } from '../../../components/reader/loans/loan-card';
import { LoanFilters } from '../../../components/reader/loans/loan-filter';
import { Card } from '../../../components/ui/card';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { LoanFilters as LoanFiltersType } from '../../../types/reader/loans';
import { BookOpen, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';
import { mockLoans, mockLoanStats } from '../../../data/reader/mock-loans';

export default function LoansPage() {
  const [filters, setFilters] = useState<LoanFiltersType>({
    status: 'all',
    search: '',
    sortBy: 'dueDate',
    sortOrder: 'asc',
  });

  // Filter and sort loans
  const filteredLoans = useMemo(() => {
    let result = [...mockLoans];

    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(loan => loan.status === filters.status);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        loan =>
          loan.bookTitle.toLowerCase().includes(searchLower) ||
          loan.bookAuthor.toLowerCase().includes(searchLower) ||
          loan.isbn.includes(searchLower)
      );
    }

    // Sort
    result.sort((a, b) => {
      let compareValue = 0;
      
      switch (filters.sortBy) {
        case 'dueDate':
          compareValue = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'loanDate':
          compareValue = new Date(a.loanDate).getTime() - new Date(b.loanDate).getTime();
          break;
        case 'title':
          compareValue = a.bookTitle.localeCompare(b.bookTitle);
          break;
      }

      return filters.sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return result;
  }, [filters]);

  const handleRenew = (loanId: string) => {
    console.log('Renovando empréstimo:', loanId);
    // Implementar lógica de renovação
  };

  const handleReturn = (loanId: string) => {
    console.log('Marcando como devolvido:', loanId);
    // Implementar lógica de devolução
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meus Empréstimos</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie seus livros emprestados e renovações
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-100">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{mockLoanStats.totalLoans}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ativos</p>
              <p className="text-2xl font-bold">{mockLoanStats.activeLoans}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-red-100">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Atrasados</p>
              <p className="text-2xl font-bold">{mockLoanStats.overdueLoans}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-yellow-100">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Multas</p>
              <p className="text-2xl font-bold">R$ {mockLoanStats.totalFines.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Overdue Alert */}
      {mockLoanStats.overdueLoans > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Você tem {mockLoanStats.overdueLoans} empréstimo(s) atrasado(s). 
            Por favor, devolva os livros o quanto antes para evitar multas adicionais.
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <LoanFilters filters={filters} onFilterChange={setFilters} />

      {/* Loans List */}
      <div className="space-y-4">
        {filteredLoans.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum empréstimo encontrado</h3>
            <p className="text-muted-foreground">
              {filters.search || filters.status !== 'all'
                ? 'Tente ajustar os filtros para encontrar o que procura.'
                : 'Você ainda não tem nenhum empréstimo ativo.'}
            </p>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Exibindo {filteredLoans.length} de {mockLoans.length} empréstimo(s)
              </p>
            </div>
            {filteredLoans.map(loan => (
              <LoanCard
                key={loan.id}
                loan={loan}
                onRenew={handleRenew}
                onReturn={handleReturn}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}