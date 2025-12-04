import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Badge } from "../../ui/badge";
import { Calendar, Clock, User, BookOpen } from "lucide-react";
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

interface SchedulingDetailsDialogProps {
  scheduling: SchedulingSimple | null;
  book: Book | null;
  reader: Reader | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function SchedulingDetailsDialog({
  scheduling,
  book,
  reader,
  open,
  onOpenChange,
}: SchedulingDetailsDialogProps) {
  if (!scheduling) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const config = statusConfig[scheduling.status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Agendamento</DialogTitle>
          <DialogDescription>
            Informações completas sobre o agendamento
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>

          {/* Leitor */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <User className="w-4 h-4" />
              Leitor
            </div>
            <div className="pl-6 space-y-1">
              <p className="text-sm font-medium">{reader?.name || "Não encontrado"}</p>
              {reader?.email && (
                <p className="text-sm text-gray-500">{reader.email}</p>
              )}
              <p className="text-xs text-gray-400 font-mono">ID: {scheduling.readerId}</p>
            </div>
          </div>

          {/* Livro */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <BookOpen className="w-4 h-4" />
              Livro
            </div>
            <div className="pl-6 space-y-1">
              <p className="text-sm font-medium">{book?.title || "Não encontrado"}</p>
              <p className="text-sm text-gray-500">{book?.author || "-"}</p>
              <p className="text-xs text-gray-400 font-mono">ID: {scheduling.bookId}</p>
            </div>
          </div>

          {/* Datas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4" />
                Criado em
              </div>
              <p className="pl-6 text-sm text-gray-600">
                {formatDate(scheduling.createdAt)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Clock className="w-4 h-4" />
                Expira em
              </div>
              <p className="pl-6 text-sm text-gray-600">
                {formatDate(scheduling.expiresAt)}
              </p>
            </div>
          </div>

          {/* ID do agendamento */}
          <div className="pt-4 border-t">
            <p className="text-xs text-gray-400">
              ID do Agendamento: <span className="font-mono">{scheduling.id}</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}