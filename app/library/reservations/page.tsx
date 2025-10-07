"use client";

import React, { useState, useMemo } from "react";
import { Card } from "../../../components/ui/card";
import ReservationStats from "../../../components/library/reservations/reservation-stats";
import ReservationFilters from "../../../components/library/reservations/reservation-filter";
import AddReservationDialog from "../../../components/library/reservations/add-reservation-dialog";
import ReservationTable from "../../../components/library/reservations/reservation-table";
import { mockReservations, Reservation } from "../../../data/library/mock-reservations";
import { mockReaders } from "../../../data/library/mock-readers";
import { useToast } from "../../../components/ui/use-toast";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  // Filtrar reservas
  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const matchesSearch =
        reservation.readerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || reservation.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reservations, searchTerm, statusFilter]);

  // Calcular estatísticas
  const stats = useMemo(() => {
    return {
      active: reservations.filter((r) => r.status === "active").length,
      ready: reservations.filter((r) => r.status === "ready").length,
      waiting: reservations.filter((r) => r.status === "waiting").length,
      total: reservations.filter(
        (r) => r.status !== "completed" && r.status !== "cancelled"
      ).length,
    };
  }, [reservations]);

  const handleAddReservation = (readerId: string, bookId: string) => {
    const reader = mockReaders.find((r) => r.id === readerId);
    const bookTitles: { [key: string]: { title: string; author: string } } = {
      b1: { title: "1984", author: "George Orwell" },
      b2: { title: "O Senhor dos Anéis", author: "J.R.R. Tolkien" },
      b3: { title: "Dom Casmurro", author: "Machado de Assis" },
      b4: { title: "Harry Potter", author: "J.K. Rowling" },
      b5: { title: "A Revolução dos Bichos", author: "George Orwell" },
      b6: { title: "Cem Anos de Solidão", author: "Gabriel García Márquez" },
    };

    const book = bookTitles[bookId];

    const newReservation: Reservation = {
      id: `${Date.now()}`,
      bookId,
      bookTitle: book.title,
      bookAuthor: book.author,
      readerId,
      readerName: reader?.name || "",
      reservationDate: new Date().toISOString().split("T")[0],
      status: "active",
    };

    setReservations([newReservation, ...reservations]);
  };

  const handleDeleteReservation = (id: string) => {
    setReservations(reservations.filter((r) => r.id !== id));
    toast({
      title: "Reserva removida",
      description: "A reserva foi removida com sucesso",
    });
  };

  const handleCompleteReservation = (id: string) => {
    setReservations(
      reservations.map((r) =>
        r.id === id ? { ...r, status: "completed" as const } : r
      )
    );
    toast({
      title: "Reserva concluída",
      description: "A reserva foi marcada como concluída",
    });
  };

  const handleCancelReservation = (id: string) => {
    setReservations(
      reservations.map((r) =>
        r.id === id ? { ...r, status: "cancelled" as const } : r
      )
    );
    toast({
      title: "Reserva cancelada",
      description: "A reserva foi cancelada",
      variant: "destructive",
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestão de Reservas
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie todas as reservas de livros da biblioteca
          </p>
        </div>
        <AddReservationDialog onAddReservation={handleAddReservation} />
      </div>

      <ReservationStats
        active={stats.active}
        ready={stats.ready}
        waiting={stats.waiting}
        total={stats.total}
      />

      <Card className="p-6">
        <div className="space-y-4">
          <ReservationFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onClearFilters={handleClearFilters}
          />

          <ReservationTable
            reservations={filteredReservations}
            onDeleteReservation={handleDeleteReservation}
            onCompleteReservation={handleCompleteReservation}
            onCancelReservation={handleCancelReservation}
          />
        </div>
      </Card>
    </div>
  );
}