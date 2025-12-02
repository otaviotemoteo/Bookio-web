"use client";

import { useEffect, useState } from 'react';
import { DashboardCard } from '../../../components/library/dashboard/dashboard-card';
import { DashboardGrid } from '../../../components/library/dashboard/dashboard-grid';
import { useLibrary } from '../../../hooks/use-library';
import { useAuth } from "../../../hooks/use-auth";

export default function BooksPage() {
  const { user } = useAuth();
  const libraryId = user?.id || "";
  
  const { getLibraryBooks, getLibraryReaders, getLibraryLoans, getLibraryPenalties } = useLibrary();
  
  const [hasBooks, setHasBooks] = useState(false);
  const [hasReaders, setHasReaders] = useState(false);
  const [hasLoans, setHasLoans] = useState(false);
  const [hasPenalties, setHasPenalties] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            {allTasksCompleted 
              ? "Gerencie sua biblioteca de forma eficiente e organizada" 
              : "Complete as primeiras ações para começar a usar o sistema"
            }
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <DashboardGrid>
        <DashboardCard
          imageSrc="/book.svg"
          title="Livros"
          description="Cadastre o primeiro livro na biblioteca."
          isCompleted={hasBooks}
          actionText="Criar primeiro livro"
          actionUrl="/books"
        />

        <DashboardCard
          imageSrc="/people.svg"
          title="Leitores"
          description="Adicione o primeiro leitor ao sistema."
          isCompleted={hasReaders}
          actionText="Criar primeiro leitor"
          actionUrl="/readers"
        />

        <DashboardCard
          imageSrc="/scheduling.svg"
          title="Empréstimos"
          description="Registre o primeiro empréstimo de livro."
          isCompleted={hasLoans}
          actionText="Criar primeiro empréstimo"
          actionUrl="/loans"
        />

        <DashboardCard
          imageSrc="/money.svg"
          title="Multas"
          description="Confira as multas pendentes."
          isCompleted={hasPenalties}
          actionText="Conferir multas"
          actionUrl="/penalties"
        />
      </DashboardGrid>
    </div>
  );
}