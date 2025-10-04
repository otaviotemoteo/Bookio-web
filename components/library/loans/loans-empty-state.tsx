import { BookOpen } from 'lucide-react';

interface LoansEmptyStateProps {
  hasFilters: boolean;
}

export function LoansEmptyState({ hasFilters }: LoansEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-gray-100 p-6 mb-4">
        <BookOpen className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {hasFilters ? 'Nenhum empréstimo encontrado' : 'Nenhum empréstimo registrado'}
      </h3>
      <p className="text-gray-500 max-w-sm">
        {hasFilters 
          ? 'Tente ajustar os filtros de busca para encontrar o que você procura.'
          : 'Registre o primeiro empréstimo para começar a gerenciar a circulação de livros.'
        }
      </p>
    </div>
  );
}