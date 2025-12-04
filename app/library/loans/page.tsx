"use client";

import { useState, useEffect, useMemo } from "react";
import { LoansTable } from "../../../components/library/loans/loans-table";
import { LoansStats } from "../../../components/library/loans/loan-stats";
import { LoansFilters } from "../../../components/library/loans/loan-filters";
import { NewLoanDialog } from "../../../components/library/loans/new-loan-dialog";
import { useAuth } from "../../../hooks/use-auth";
import { useLibrary } from "../../../hooks/use-library";
import { useLoan } from "../../../hooks/use-loan";
import { useToast } from "../../../components/ui/use-toast";
import {
  Loan,
  LoanStatus,
  CreateLoanRequest,
} from "../../../types/index";

export default function LoansPage() {
  const { user } = useAuth();
  const libraryId = user?.id || "";
  
  const { getLibraryLoans } = useLibrary();
  const { createLoan, deleteLoan } = useLoan();
  const { toast } = useToast();

  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<LoanStatus | "all">("all");

  useEffect(() => {
    if (libraryId) {
      loadLoans();
    }
  }, [libraryId]);

  const loadLoans = async () => {
    if (!libraryId) return;

    setIsLoading(true);
    try {
      console.log("📤 Buscando empréstimos da biblioteca...");
      const result = await getLibraryLoans(libraryId);

      if (result.success && result.data) {
        console.log("✅ Empréstimos carregados:", result.data);
        setLoans(result.data);
      } else {
        console.error("❌ Erro ao carregar empréstimos:", result.error);
        toast({
          title: "Erro ao carregar empréstimos",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("❌ Erro ao carregar empréstimos:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar empréstimos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar empréstimos
  const filteredLoans = useMemo(() => {
    return loans.filter((loan) => {
      const matchesSearch =
        loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.bookId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.readerId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || loan.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [loans, searchTerm, statusFilter]);

  // Calcular estatísticas
  const stats = useMemo(() => {
    const activeLoans = loans.filter((l) => l.status === "ACTIVE").length;
    const overdueLoans = loans.filter((l) => l.status === "OVERDUE").length;
    const today = new Date().toISOString().split("T")[0];
    const returnedToday = loans.filter(
      (l) => l.status === "RETURNED" && l.returnDate === today
    ).length;

    return { activeLoans, overdueLoans, returnedToday, totalFines: 0 };
  }, [loans]);

  // Registrar novo empréstimo
  const handleNewLoan = async (data: CreateLoanRequest) => {
    console.log("📤 Criando empréstimo:", data);
    const result = await createLoan(data);

    if (result.success) {
      console.log("✅ Empréstimo criado!");
      toast({
        title: "Empréstimo registrado!",
        description: "O empréstimo foi registrado com sucesso.",
      });
      loadLoans(); // Recarregar lista
    } else {
      console.error("❌ Erro ao criar empréstimo:", result.error);
      toast({
        title: "Erro ao registrar empréstimo",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  // Deletar empréstimo
  const handleDelete = async (loanId: string) => {
    if (!confirm("Tem certeza que deseja deletar este empréstimo?")) {
      return;
    }

    console.log("📤 Deletando empréstimo:", loanId);
    const result = await deleteLoan(loanId);

    if (result.success) {
      console.log("✅ Empréstimo deletado!");
      toast({
        title: "Empréstimo deletado!",
        description: "O empréstimo foi removido com sucesso.",
      });
      loadLoans(); // Recarregar lista
    } else {
      console.error("❌ Erro ao deletar empréstimo:", result.error);
      toast({
        title: "Erro ao deletar empréstimo",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  // Loading inicial
  if (!user) {
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
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Empréstimos e Devoluções
          </h1>
          <p className="text-gray-600">
            Gerencie os empréstimos e devoluções de livros
          </p>
        </div>
        <NewLoanDialog libraryId={libraryId} onSubmit={handleNewLoan} />
      </div>

      {/* Estatísticas */}
      <div className="mb-8">
        <LoansStats {...stats} />
      </div>

      {/* Filtros e Tabela */}
      <div className="space-y-6">
        <LoansFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <LoansTable
          loans={filteredLoans}
          onDelete={handleDelete}
          hasFilters={searchTerm !== "" || statusFilter !== "all"}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}