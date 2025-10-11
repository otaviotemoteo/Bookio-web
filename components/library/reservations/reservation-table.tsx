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
import { Trash2, CheckCircle, XCircle } from "lucide-react";
import { Reservation, ReservationStatus } from "../../../types/library/reservations";

interface ReservationTableProps {
  reservations: Reservation[];
  onDeleteReservation: (id: string) => void;
  onCompleteReservation: (id: string) => void;
  onCancelReservation: (id: string) => void;
}

const ReservationTable: React.FC<ReservationTableProps> = ({
  reservations,
  onDeleteReservation,
  onCompleteReservation,
  onCancelReservation,
}) => {
  const getStatusBadge = (status: ReservationStatus, position?: number) => {
    const statusConfig: Record<
      ReservationStatus,
      { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
    > = {
      active: { label: "Ativa", variant: "default" },
      ready: { label: "Pronta", variant: "default" },
      waiting: { label: position ? `Fila ${position}º` : "Fila", variant: "secondary" },
      completed: { label: "Concluída", variant: "outline" },
      cancelled: { label: "Cancelada", variant: "destructive" },
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  if (reservations.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhuma reserva encontrada
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Leitor</TableHead>
            <TableHead>Livro</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Data Reserva</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Validade</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-medium">
                {reservation.readerName}
              </TableCell>
              <TableCell>{reservation.bookTitle}</TableCell>
              <TableCell>{reservation.bookAuthor}</TableCell>
              <TableCell>{formatDate(reservation.reservationDate)}</TableCell>
              <TableCell>
                {getStatusBadge(reservation.status, reservation.position)}
              </TableCell>
              <TableCell>
                {reservation.expirationDate
                  ? formatDate(reservation.expirationDate)
                  : "-"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {reservation.status === "ready" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onCompleteReservation(reservation.id)}
                      className="gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Concluir
                    </Button>
                  )}
                  {(reservation.status === "active" ||
                    reservation.status === "waiting") && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onCancelReservation(reservation.id)}
                      className="gap-1"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancelar
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDeleteReservation(reservation.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReservationTable;