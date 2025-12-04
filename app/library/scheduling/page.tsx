"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import SchedulingStatsComponent from "../../../components/library/scheduling/scheduling-stats";
import SchedulingFiltersComponent from "../../../components/library/scheduling/scheduling-filters";
import SchedulingTable from "../../../components/library/scheduling/scheduling-table";
import { SchedulingDetailsDialog } from "../../../components/library/scheduling/scheduling-details-dialog";
import { useToast } from "../../../components/ui/use-toast";
import { useScheduling } from "../../../hooks/use-scheduling";
import { useLibrary } from "../../../hooks/use-library";
import { useAuth } from "../../../hooks/use-auth";
import {
  SchedulingSimple,
  SchedulingStatus,
} from "../../../types/index";

interface SchedulingFilters {
  status?: SchedulingStatus | "all";
  searchTerm?: string;
  readerId?: string | "all";
}

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

export default function SchedulingsPage() {
  const { user } = useAuth();
  const libraryId = user?.id || "";
  const { toast } = useToast();
  const { cancelScheduling } = useScheduling();
  const { getLibrarySchedulings, getLibraryReaders, getLibraryBooks } = useLibrary();

  const [schedulings, setSchedulings] = useState<SchedulingSimple[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [readers, setReaders] = useState<Reader[]>([]);
  const [filters, setFilters] = useState<SchedulingFilters>({
    status: "all",
    searchTerm: "",
    readerId: "all",
  });
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado do dialog de detalhes
  const [selectedScheduling, setSelectedScheduling] = useState<SchedulingSimple | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  // Carregar dados iniciais
  useEffect(() => {
    if (libraryId) {
      loadData();
    }
  }, [libraryId]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      console.log("📤 Carregando dados da biblioteca:", libraryId);

      // Buscar agendamentos, readers e books em paralelo
      const [schedulingsResult, readersResult, booksResult] = await Promise.all([
        getLibrarySchedulings(libraryId),
        getLibraryReaders(libraryId),
        getLibraryBooks(libraryId),
      ]);

      // Processar agendamentos
      if (schedulingsResult.success && schedulingsResult.data) {
        console.log("✅ Agendamentos carregados:", schedulingsResult.data);
        setSchedulings(schedulingsResult.data);
      } else {
        console.error("❌ Erro ao carregar agendamentos:", schedulingsResult.error);
        toast({
          title: "Erro",
          description: schedulingsResult.error || "Erro ao carregar agendamentos",
          variant: "destructive",
        });
      }

      // Processar readers
      if (readersResult.success && readersResult.data) {
        console.log("✅ Readers carregados:", readersResult.data);
        setReaders(readersResult.data);
      } else {
        console.error("❌ Erro ao carregar readers:", readersResult.error);
        toast({
          title: "Erro",
          description: readersResult.error || "Erro ao carregar leitores",
          variant: "destructive",
        });
      }

      // Processar books
      if (booksResult.success && booksResult.data) {
        console.log("✅ Books carregados:", booksResult.data);
        setBooks(booksResult.data);
      } else {
        console.error("❌ Erro ao carregar books:", booksResult.error);
        toast({
          title: "Erro",
          description: booksResult.error || "Erro ao carregar livros",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("❌ Erro ao carregar dados:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados da página",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar agendamentos
  const filteredSchedulings = useMemo(() => {
    return schedulings.filter((scheduling) => {
      const book = books.find((b) => b.id === scheduling.bookId);
      const reader = readers.find((r) => r.id === scheduling.readerId);

      // Filtro de busca (livro, autor ou leitor)
      const matchesSearch =
        !filters.searchTerm ||
        book?.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        book?.author.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        reader?.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

      // Filtro de status
      const matchesStatus =
        !filters.status ||
        filters.status === "all" ||
        scheduling.status === filters.status;

      // Filtro de leitor
      const matchesReader =
        !filters.readerId ||
        filters.readerId === "all" ||
        scheduling.readerId === filters.readerId;

      return matchesSearch && matchesStatus && matchesReader;
    });
  }, [schedulings, filters, books, readers]);

  const handleCancelScheduling = async (id: string) => {
    if (!confirm("Tem certeza que deseja cancelar este agendamento?")) {
      return;
    }

    console.log("📤 Cancelando agendamento:", id);
    const result = await cancelScheduling(id);

    if (result.success) {
      console.log("✅ Agendamento cancelado com sucesso!");
      toast({
        title: "Agendamento cancelado",
        description: "O agendamento foi cancelado com sucesso",
      });

      // Recarregar dados
      await loadData();
    } else {
      console.error("❌ Erro ao cancelar agendamento:", result.error);
      toast({
        title: "Erro",
        description: result.error || "Erro ao cancelar agendamento",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (scheduling: SchedulingSimple) => {
    setSelectedScheduling(scheduling);
    setDetailsDialogOpen(true);
  };

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      searchTerm: "",
      readerId: "all",
    });
  };

  // Buscar dados do scheduling selecionado
  const selectedBook = selectedScheduling 
    ? books.find(b => b.id === selectedScheduling.bookId) || null
    : null;
  
  const selectedReader = selectedScheduling
    ? readers.find(r => r.id === selectedScheduling.readerId) || null
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestão de Agendamentos
        </h1>
        <p className="text-gray-600 mt-1">
          Gerencie todos os agendamentos de retirada de livros
        </p>
      </div>

      {/* Estatísticas */}
      <div className="mb-8">
        <SchedulingStatsComponent schedulings={schedulings} />
      </div>

      {/* Filtros e Tabela */}
      <Card className="p-6">
        <div className="space-y-4">
          <SchedulingFiltersComponent
            filters={filters}
            readers={readers}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
          />

          <SchedulingTable
            schedulings={filteredSchedulings}
            books={books}
            readers={readers}
            onCancelScheduling={handleCancelScheduling}
            onViewDetails={handleViewDetails}
            isLoading={false}
          />
        </div>
      </Card>

      {/* Dialog de Detalhes */}
      <SchedulingDetailsDialog
        scheduling={selectedScheduling}
        book={selectedBook}
        reader={selectedReader}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      />
    </div>
  );
}