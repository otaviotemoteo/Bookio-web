import React from "react";
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
import { Trash2, XCircle } from "lucide-react";
import { SchedulingSimple, SchedulingStatus } from "../../../types/index";

interface SchedulingTableProps {
  schedulings: SchedulingSimple[];
  books: any[]; // Dados dos livros para exibir título/autor
  onCancelScheduling: (id: string) => void;
  isLoading?: boolean;
}

const SchedulingTable: React.FC<SchedulingTableProps> = ({
  schedulings,
  books,
  onCancelScheduling,
  isLoading,
}) => {
  const getStatusBadge = (status: SchedulingStatus) => {
    const statusConfig: Record<
      SchedulingStatus,
      {
        label: string;
        variant: "default" | "secondary" | "outline" | "destructive";
      }
    > = {
      PENDING: { label: "Pendente", variant: "secondary" },
      COMPLETED: { label: "Concluído", variant: "outline" },
      CANCELLED: { label: "Cancelado", variant: "destructive" },
      EXPIRED: { label: "Expirado", variant: "destructive" },
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBookInfo = (bookId: number) => {
    const book = books.find((b) => b.id === bookId);
    return book || { title: "Livro não encontrado", author: "-" };
  };

  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-500">
        Carregando agendamentos...
      </div>
    );
  }

  if (schedulings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhum agendamento encontrado
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Livro</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expira em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedulings.map((scheduling) => {
            const book = getBookInfo(scheduling.bookId);
            return (
              <TableRow key={scheduling.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{getStatusBadge(scheduling.status)}</TableCell>
                <TableCell>{formatDate(scheduling.expiresAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {scheduling.status === "PENDING" && (
                      <Button
                        size="sm"
                        variant="red"
                        onClick={() => onCancelScheduling(scheduling.id)}
                      >
                        <XCircle className="w-4 h-4" />
                        Cancelar
                      </Button>
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
};

export default SchedulingTable;
