"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/use-auth";
import { useLibrary } from "../../../hooks/use-library";
import { DashboardEmptyState } from "../../../components/library/dashboard/dashboard-empty-state";
import { DashboardMetrics } from "../../../components/library/dashboard/dashboard-metrics";
import { Book } from "../../../types/book";
import { Reader } from "../../../types/reader";
import { Loan } from "../../../types/loan";
import { Penalty } from "../../../types/penalty";

export default function DashboardPage() {
  const { user } = useAuth();
  const libraryId = user?.id || "";
  
  const { getLibraryBooks, getLibraryReaders, getLibraryLoans, getLibraryPenalties } = useLibrary();
  
  const [hasBooks, setHasBooks] = useState(false);
  const [hasReaders, setHasReaders] = useState(false);
  const [hasLoans, setHasLoans] = useState(false);
  const [hasPenalties, setHasPenalties] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Dados para as métricas
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [readersData, setReadersData] = useState<Reader[]>([]);
  const [loansData, setLoansData] = useState<Loan[]>([]);
  const [penaltiesData, setPenaltiesData] = useState<Penalty[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!libraryId) return;
      
      setIsLoading(true);
      
      try {
        // Busca os dados das rotas
        const booksResult = await getLibraryBooks(libraryId);
        const readersResult = await getLibraryReaders(libraryId);
        const loansResult = await getLibraryLoans(libraryId);
        const penaltiesResult = await getLibraryPenalties(libraryId);

        // Extrai os dados ou usa array vazio como fallback
        const books = booksResult?.data || [];
        const readers = readersResult?.data || [];
        const loans = loansResult?.data || [];
        const penalties = penaltiesResult?.data || [];

        // Guarda os dados completos
        setBooksData(books);
        setReadersData(readers);
        setLoansData(loans);
        setPenaltiesData(penalties);

        // Verifica se já existem dados
        setHasBooks(books.length > 0);
        setHasReaders(readers.length > 0);
        setHasLoans(loans.length > 0);
        setHasPenalties(penalties.length > 0);
      } catch (error) {
        console.error('Erro ao buscar dados da dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [libraryId]);

  // Verifica se todas as tarefas foram completadas
  const allTasksCompleted = hasBooks && hasReaders && hasLoans && hasPenalties;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return allTasksCompleted ? (
    <DashboardMetrics
      books={booksData}
      readers={readersData}
      loans={loansData}
      penalties={penaltiesData}
    />
  ) : (
    <DashboardEmptyState
      hasBooks={hasBooks}
      hasReaders={hasReaders}
      hasLoans={hasLoans}
      hasPenalties={hasPenalties}
    />
  );
}