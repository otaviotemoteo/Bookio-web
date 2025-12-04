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
import { XCircle, Eye } from "lucide-react";
import { SchedulingSimple, SchedulingStatus } from "../../../types/index";

interface Book {
  id: number;
  title: string;
  author: string;
  available: number;
}

interface Reader {
  id: string;
  name: string;
  email?: string;
}

interface SchedulingTableProps {
  schedulings: SchedulingSimple[];
  books: Book[];
  readers: Reader[];
  onCancelScheduling: (id: string) => void;
  onViewDetails: (scheduling: SchedulingSimple) => void;
  isLoading?: boolean;
}

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

const SchedulingTable: React.FC<SchedulingTableProps> = ({
  schedulings,
  books,
  readers,
  onCancelScheduling,
  onViewDetails,
  isLoading,
}) => {
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

  const getReaderInfo = (readerId: string) => {
    const reader = readers.find((r) => r.id === readerId);
    return reader || { name: "Leitor não encontrado", email: undefined };
  };

  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Carregando agendamentos...</p>
      </div>
    );
  }

  if (schedulings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Nenhum agendamento encontrado</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Leitor</TableHead>
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
            const reader = getReaderInfo(scheduling.readerId);
            const config = statusConfig[scheduling.status];

            return (
              <TableRow key={scheduling.id}>
                <TableCell className="font-medium">{reader.name}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <Badge variant={config.variant}>{config.label}</Badge>
                </TableCell>
                <TableCell>{formatDate(scheduling.expiresAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewDetails(scheduling)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Detalhes
                    </Button>
                    {scheduling.status === "PENDING" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
                            onCancelScheduling(scheduling.id);
                          }
                        }}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
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