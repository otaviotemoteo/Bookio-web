import { DashboardCard } from '../../../components/library/dashboard/dashboard-card';
import { DashboardGrid } from '../../../components/library/dashboard/dashboard-grid';

export default async function DashboardPage() {
  // Aqui você vai buscar os dados das suas rotas
  // const books = await fetchBooks();
  // const readers = await fetchReaders();
  // const loans = await fetchLoans();
  // const penalties = await fetchPenalties();

  // Exemplo temporário - você vai substituir isso
  const books = []; // Substituir pela chamada real
  const readers = []; // Substituir pela chamada real
  const loans = []; // Substituir pela chamada real
  const penalties = []; // Substituir pela chamada real

  // Verifica se já existem dados (concluído ou não)
  const hasBooks = books.length > 0;
  const hasReaders = readers.length > 0;
  const hasLoans = loans.length > 0;
  const hasPenalties = penalties.length > 0;
// Verifica se todas as tarefas foram completadas
  const allTasksCompleted = hasBooks && hasReaders && hasLoans && hasPenalties;

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
          actionUrl="/library/books"
        />

        <DashboardCard
          imageSrc="/people.svg"
          title="Leitores"
          description="Adicione o primeiro leitor ao sistema."
          isCompleted={hasReaders}
          actionText="Criar primeiro leitor"
          actionUrl="/library/readers"
        />

        <DashboardCard
          imageSrc="/scheduling.svg"
          title="Empréstimos"
          description="Registre o primeiro empréstimo de livro."
          isCompleted={hasLoans}
          actionText="Criar primeiro empréstimo"
          actionUrl="/library/loans"
        />

        <DashboardCard
          imageSrc="/money.svg"
          title="Multas"
          description="Confira as multas pendentes."
          isCompleted={hasPenalties}
          actionText="Conferir multas"
          actionUrl="/library/payments"
        />
      </DashboardGrid>
    </div>
  );
}