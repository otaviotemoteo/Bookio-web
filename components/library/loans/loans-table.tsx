import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Calendar, Clock, Trash2 } from "lucide-react";
import { LoansEmptyState } from "../loans/loans-empty-state";
import { Loan, LoanStatus } from "../../../types/index";

interface LoansTableProps {
  loans: Loan[];
  onDelete: (loanId: string) => void;
  hasFilters?: boolean;
  isLoading?: boolean;
}

const statusConfig: Record<LoanStatus, { label: string; color: string }> = {
  ACTIVE: { label: "Ativo", color: "bg-blue-500" },
  OVERDUE: { label: "Atrasado", color: "bg-red-500" },
  RETURNED: { label: "Devolvido", color: "bg-green-500" },
};

export function LoansTable({
  loans,
  onDelete,
  hasFilters = false,
  isLoading = false,
}: LoansTableProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="rounded-md border bg-white p-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando empréstimos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (loans.length === 0) {
    return (
      <div className="rounded-md border bg-white">
        <LoansEmptyState hasFilters={hasFilters} />
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Empréstimo</TableHead>
            <TableHead>ID Livro</TableHead>
            <TableHead>ID Leitor</TableHead>
            <TableHead>Data Devolução</TableHead>
            <TableHead>Data Limite</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => {
            const daysUntilDue = getDaysUntilDue(loan.dueDate);
            const config = statusConfig[loan.status] || {
              label: loan.status || "Desconhecido",
              color: "bg-gray-500"
            };

            return (
              <TableRow key={loan.id}>
                <TableCell>
                  <span className="font-mono text-sm">{loan.id}</span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">{loan.bookId}</span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">{loan.readerId}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {formatDate(loan.returnDate)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {formatDate(loan.dueDate)}
                    </div>
                    {loan.status === "ACTIVE" &&
                      daysUntilDue <= 3 &&
                      daysUntilDue > 0 && (
                        <span className="text-xs text-orange-600">
                          {daysUntilDue} dia(s) restante(s)
                        </span>
                      )}
                    {loan.status === "OVERDUE" && (
                      <span className="text-xs text-red-600 font-medium">
                        {Math.abs(daysUntilDue)} dia(s) atrasado
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${config.color} text-white`}>
                    {config.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(loan.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}