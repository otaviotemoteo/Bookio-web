import { useState } from 'react';
import { Loan } from '../../../types/loans';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Calendar, Clock, RotateCcw, CheckCircle } from 'lucide-react';
import { LoansEmptyState } from '../loans/loans-empty-state';

interface LoansTableProps {
  loans: Loan[];
  onReturn: (loanId: string) => void;
  onRenew: (loanId: string) => void;
  hasFilters?: boolean; 
}

const statusConfig = {
  active: { label: 'Ativo', color: 'bg-blue-500' },
  overdue: { label: 'Atrasado', color: 'bg-red-500' },
  returned: { label: 'Devolvido', color: 'bg-green-500' },
  pending: { label: 'Pendente', color: 'bg-yellow-500' }
};

export function LoansTable({ loans, onReturn, onRenew }: LoansTableProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Livro</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Data Empréstimo</TableHead>
            <TableHead>Data Devolução</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Renovações</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => {
            const daysUntilDue = getDaysUntilDue(loan.dueDate);
            const config = statusConfig[loan.status];

            return (
              <TableRow key={loan.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{loan.bookTitle}</span>
                    <span className="text-sm text-gray-500">{loan.bookAuthor}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{loan.userName}</span>
                    <span className="text-sm text-gray-500">{loan.userEmail}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {formatDate(loan.loanDate)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {formatDate(loan.dueDate)}
                    </div>
                    {loan.status === 'active' && daysUntilDue <= 3 && daysUntilDue > 0 && (
                      <span className="text-xs text-orange-600">
                        {daysUntilDue} dia(s) restante(s)
                      </span>
                    )}
                    {loan.status === 'overdue' && (
                      <span className="text-xs text-red-600 font-medium">
                        {Math.abs(daysUntilDue)} dia(s) atrasado
                      </span>
                    )}
                    {loan.returnDate && (
                      <span className="text-xs text-green-600">
                        Devolvido: {formatDate(loan.returnDate)}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${config.color} text-white`}>
                    {config.label}
                  </Badge>
                  {loan.fine && loan.fine > 0 && (
                    <div className="mt-1 text-xs text-red-600 font-medium">
                      Multa: R$ {loan.fine.toFixed(2)}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm">{loan.renewalCount}/3</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {loan.status !== 'returned' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onRenew(loan.id)}
                          disabled={loan.renewalCount >= 3 || loan.status === 'overdue'}
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Renovar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => onReturn(loan.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Devolver
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}