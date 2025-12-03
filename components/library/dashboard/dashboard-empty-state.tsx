import { DashboardGrid } from "./dashboard-grid";
import { DashboardCard } from "./dashboard-card";

interface DashboardEmptyStateProps {
  hasBooks: boolean;
  hasReaders: boolean;
  hasLoans: boolean;
  hasPenalties: boolean;
}

export function DashboardEmptyState({
  hasBooks,
  hasReaders,
  hasLoans,
  hasPenalties
}: DashboardEmptyStateProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Complete as primeiras ações para começar a usar o sistema
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