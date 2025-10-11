"use client";

import React, { useState, useMemo } from "react";
import { Card } from "../../../components/ui/card";
import ReservationStatsComponent from "../../../components/library/reservations/reservation-stats";
import ReservationFiltersComponent from "../../../components/library/reservations/reservation-filter";
import AddReservationDialog from "../../../components/library/reservations/add-reservation-dialog";
import ReservationTable from "../../../components/library/reservations/reservation-table";
import { mockReservations } from "../../../data/library/mock-reservations";
import { mockReaders } from "../../../data/library/mock-readers";
import { useToast } from "../../../components/ui/use-toast";
import {
  Reservation,
  ReservationFilters,
  ReservationStats,
  CreateReservationDTO,
} from "../../../types/library/reservations";

export default function ReservationsPage() {
  const [reservations, setReservations] =
    useState<Reservation[]>(mockReservations);
  const [filters, setFilters] = useState<ReservationFilters>({
    status: "all",
    searchTerm: "",
  });
  const { toast } = useToast();

  // Filtrar reservas
  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const matchesSearch =
        !filters.searchTerm ||
        reservation.readerName
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        reservation.bookTitle
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        reservation.bookAuthor
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase());

      const matchesStatus =
        !filters.status ||
        filters.status === "all" ||
        reservation.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [reservations, filters]);

  // Calcular estatísticas
  const stats = useMemo((): ReservationStats => {
    return {
      active: reservations.filter((r) => r.status === "active").length,
      ready: reservations.filter((r) => r.status === "ready").length,
      waiting: reservations.filter((r) => r.status === "waiting").length,
      completed: reservations.filter((r) => r.status === "completed").length,
      cancelled: reservations.filter((r) => r.status === "cancelled").length,
      total: reservations.filter(
        (r) => r.status !== "completed" && r.status !== "cancelled"
      ).length,
    };
  }, [reservations]);

  const handleAddReservation = (data: CreateReservationDTO) => {
    const reader = mockReaders.find((r) => r.id === data.readerId);
    const bookTitles: { [key: string]: { title: string; author: string } } = {
      b1: { title: "1984", author: "George Orwell" },
      b2: { title: "O Senhor dos Anéis", author: "J.R.R. Tolkien" },
      b3: { title: "Dom Casmurro", author: "Machado de Assis" },
      b4: { title: "Harry Potter", author: "J.K. Rowling" },
      b5: { title: "A Revolução dos Bichos", author: "George Orwell" },
      b6: { title: "Cem Anos de Solidão", author: "Gabriel García Márquez" },
    };

    const book = bookTitles[data.bookId];

    const newReservation: Reservation = {
      id: `${Date.now()}`,
      bookId: data.bookId,
      bookTitle: book.title,
      bookAuthor: book.author,
      readerId: data.readerId,
      readerName: reader?.name || "",
      readerEmail: reader?.email,
      reservationDate: new Date().toISOString().split("T")[0],
      status: "active",
      priority: data.priority || "normal",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
        r.id === id
          ? {
              ...r,
              status: "completed",
              completedDate: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : r
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
        r.id === id
          ? {
              ...r,
              status: "cancelled",
              cancelledDate: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : r
      )
    );
    toast({
      title: "Reserva cancelada",
      description: "A reserva foi cancelada",
      variant: "destructive",
    });
  };

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      searchTerm: "",
    });
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

      <ReservationStatsComponent stats={stats} />

      <Card className="p-6">
        <div className="space-y-4">
          <ReservationFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
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