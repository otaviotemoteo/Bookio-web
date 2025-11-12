import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Loan } from '../../../types/reader/loans';
import { Calendar, RotateCcw, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface LoanCardProps {
  loan: Loan;
  onRenew: (loanId: string) => void;
  onReturn?: (loanId: string) => void;
}

const statusConfig = {
  active: {
    label: 'Ativo',
    className: 'bg-green-100 text-green-800',
  },
  overdue: {
    label: 'Atrasado',
    className: 'bg-red-100 text-red-800',
  },
  returned: {
    label: 'Devolvido',
    className: 'bg-gray-100 text-gray-800',
  },
  renewed: {
    label: 'Renovado',
    className: 'bg-blue-100 text-blue-800',
  },
};

export function LoanCard({ loan, onRenew, onReturn }: LoanCardProps) {
  const isOverdue = loan.status === 'overdue';
  const canRenew = loan.renewalCount < loan.maxRenewals && loan.status === 'active';
  const daysUntilDue = Math.ceil(
    (new Date(loan.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-4 p-6">
        {/* Book Cover */}
        <div className="relative w-full md:w-32 h-48 md:h-48 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
          {loan.bookCover ? (
            <Image
              src={loan.bookCover}
              alt={loan.bookTitle}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Sem capa
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate">{loan.bookTitle}</h3>
              <p className="text-sm text-muted-foreground truncate">{loan.bookAuthor}</p>
              <p className="text-xs text-muted-foreground mt-1">ISBN: {loan.isbn}</p>
            </div>
            <Badge className={statusConfig[loan.status].className}>
              {statusConfig[loan.status].label}
            </Badge>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Empréstimo:</span>
              <span className="font-medium">
                {new Date(loan.loanDate).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className={`w-4 h-4 ${isOverdue ? 'text-red-500' : 'text-muted-foreground'}`} />
              <span className="text-muted-foreground">Devolução:</span>
              <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                {new Date(loan.dueDate).toLocaleDateString('pt-BR')}
              </span>
              {!isOverdue && daysUntilDue <= 3 && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  {daysUntilDue} dias restantes
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Renovações:</span>
              <span className="font-medium">
                {loan.renewalCount} / {loan.maxRenewals}
              </span>
            </div>
            {isOverdue && loan.fine && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">Multa: R$ {loan.fine.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {canRenew && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRenew(loan.id)}
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Renovar
              </Button>
            )}
            {loan.status === 'active' && onReturn && (
              <Button
                size="sm"
                variant="default"
                onClick={() => onReturn(loan.id)}
              >
                Marcar como Devolvido
              </Button>
            )}
            {isOverdue && (
              <Button size="sm" variant="destructive">
                Pagar Multa
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}