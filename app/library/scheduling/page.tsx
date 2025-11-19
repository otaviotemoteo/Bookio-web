"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import SchedulingStatsComponent from "../../../components/library/scheduling/scheduling-stats";
import SchedulingFiltersComponent from "../../../components/library/scheduling/scheduling-filters";
import AddSchedulingDialog from "../../../components/library/scheduling/add-scheduling-dialog";
import SchedulingTable from "../../../components/library/scheduling/scheduling-table";
import { useToast } from "../../../components/ui/use-toast";
import { useScheduling } from "../../../hooks/use-scheduling";
import { useAuth } from "../../../hooks/use-auth";
import {
  SchedulingSimple,
  SchedulingStatus,
  CreateSchedulingRequest,
} from "../../../types/index";

interface SchedulingFilters {
  status?: SchedulingStatus | "all";
  searchTerm?: string;
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
  const { isLoading: isSchedulingLoading, cancelScheduling } = useScheduling();

  const [schedulings, setSchedulings] = useState<SchedulingSimple[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [readers, setReaders] = useState<Reader[]>([]);
  const [selectedReaderId, setSelectedReaderId] = useState<string>("");
  const [filters, setFilters] = useState<SchedulingFilters>({
    status: "all",
    searchTerm: "",
  });
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingSchedulings, setIsLoadingSchedulings] = useState(false);

  // Carregar readers e books iniciais
  useEffect(() => {
    if (libraryId) {
      loadInitialData();
    }
  }, [libraryId]);

  // Carregar agendamentos quando selecionar um reader
  useEffect(() => {
    if (selectedReaderId) {
      loadSchedulings(selectedReaderId);
    } else {
      setSchedulings([]);
    }
  }, [selectedReaderId]);

  const loadInitialData = async () => {
    setIsLoadingInitial(true);
    try {
      console.log("📤 Carregando readers e books da biblioteca:", libraryId);

      const [readersRes, booksRes] = await Promise.all([
        fetch(`/api/library/${libraryId}/readers`),
        fetch(`/api/library/${libraryId}/books`),
      ]);

      if (readersRes.ok) {
        const readersData = await readersRes.json();
        console.log("✅ Readers carregados:", readersData);
        setReaders(readersData.readers || []);
      } else {
        console.error("❌ Erro ao buscar readers");
        toast({
          title: "Erro",
          description: "Erro ao carregar leitores",
          variant: "destructive",
        });
      }

      if (booksRes.ok) {
        const booksData = await booksRes.json();
        console.log("✅ Books carregados:", booksData);
        setBooks(booksData.books || []);
      } else {
        console.error("❌ Erro ao buscar books");
        toast({
          title: "Erro",
          description: "Erro ao carregar livros",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("❌ Erro ao carregar dados iniciais:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados da página",
        variant: "destructive",
      });
    } finally {
      setIsLoadingInitial(false);
    }
  };

  const loadSchedulings = async (readerId: string) => {
    setIsLoadingSchedulings(true);
    try {
      console.log("📤 Buscando agendamentos do leitor:", readerId);

      const response = await fetch(`/api/readers/${readerId}/schedulings`);

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Agendamentos carregados:", data);
        setSchedulings(data.schedulings || []);
      } else {
        console.error("❌ Erro ao buscar agendamentos");
        toast({
          title: "Erro",
          description: "Erro ao carregar agendamentos",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("❌ Erro ao carregar agendamentos:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar agendamentos",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSchedulings(false);
    }
  };

  // Filtrar agendamentos
  const filteredSchedulings = useMemo(() => {
    return schedulings.filter((scheduling) => {
      const book = books.find((b) => b.id === scheduling.bookId);

      const matchesSearch =
        !filters.searchTerm ||
        book?.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        book?.author.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesStatus =
        !filters.status ||
        filters.status === "all" ||
        scheduling.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [schedulings, filters, books]);

  const handleAddScheduling = async (data: CreateSchedulingRequest) => {
    try {
      console.log("📤 Criando agendamento:", data);

      const response = await fetch("/api/schedulings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Agendamento criado:", result);

        // Se o agendamento foi criado para o reader selecionado, recarregar
        if (data.readerId === selectedReaderId) {
          await loadSchedulings(selectedReaderId);
        }

        toast({
          title: "Agendamento criado",
          description: "O agendamento foi criado com sucesso",
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || "Erro ao criar agendamento");
      }
    } catch (error: any) {
      console.error("❌ Erro ao criar agendamento:", error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar agendamento",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleCancelScheduling = async (id: string) => {
    const result = await cancelScheduling(id);

    if (result.success) {
      toast({
        title: "Agendamento cancelado",
        description: "O agendamento foi cancelado com sucesso",
      });

      // Recarregar agendamentos
      if (selectedReaderId) {
        await loadSchedulings(selectedReaderId);
      }
    } else {
      toast({
        title: "Erro",
        description: result.error || "Erro ao cancelar agendamento",
        variant: "destructive",
      });
    }
  };

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      searchTerm: "",
    });
  };

  if (isLoadingInitial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestão de Agendamentos
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie todos os agendamentos de retirada de livros
          </p>
        </div>
        {libraryId && (
          <AddSchedulingDialog
            libraryId={libraryId}
            onAddScheduling={handleAddScheduling}
          />
        )}
      </div>

      {/* Seletor de Reader */}
      <Card className="p-6">
        <div className="space-y-2">
          <Label htmlFor="reader-select">Selecione um leitor</Label>
          <Select value={selectedReaderId} onValueChange={setSelectedReaderId}>
            <SelectTrigger id="reader-select">
              <SelectValue placeholder="Escolha um leitor para ver seus agendamentos" />
            </SelectTrigger>
            <SelectContent>
              {readers.length === 0 ? (
                <SelectItem value="none" disabled>
                  Nenhum leitor cadastrado
                </SelectItem>
              ) : (
                readers.map((reader) => (
                  <SelectItem key={reader.id} value={reader.id}>
                    {reader.name}
                    {reader.email && ` (${reader.email})`}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {selectedReaderId ? (
        <>
          {isLoadingSchedulings ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Carregando agendamentos...</p>
              </div>
            </div>
          ) : (
            <>
              <SchedulingStatsComponent schedulings={schedulings} />

              <Card className="p-6">
                <div className="space-y-4">
                  <SchedulingFiltersComponent
                    filters={filters}
                    onFiltersChange={setFilters}
                    onClearFilters={handleClearFilters}
                  />

                  <SchedulingTable
                    schedulings={filteredSchedulings}
                    books={books}
                    onCancelScheduling={handleCancelScheduling}
                    isLoading={isSchedulingLoading}
                  />
                </div>
              </Card>
            </>
          )}
        </>
      ) : (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            <p className="text-lg">
              Selecione um leitor acima para visualizar seus agendamentos
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
