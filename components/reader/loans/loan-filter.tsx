import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';
import { Button } from '../../../components/ui/button';
import { LoanFilters as LoanFiltersType } from '../../../types/reader/loans';
import { Search, SlidersHorizontal } from 'lucide-react';

interface LoanFiltersProps {
  filters: LoanFiltersType;
  onFilterChange: (filters: LoanFiltersType) => void;
}

export function LoanFilters({ filters, onFilterChange }: LoanFiltersProps) {
  const handleStatusChange = (status: string) => {
    onFilterChange({
      ...filters,
      status: status as LoanFiltersType['status'],
    });
  };

  const handleSearchChange = (search: string) => {
    onFilterChange({
      ...filters,
      search,
    });
  };

  const handleSortChange = (sortBy: string) => {
    onFilterChange({
      ...filters,
      sortBy: sortBy as LoanFiltersType['sortBy'],
    });
  };

  return (
    <div className="bg-card rounded-lg border p-4 space-y-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
        <h3 className="font-semibold">Filtros</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título ou autor..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={filters.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativos</option>
            <option value="overdue">Atrasados</option>
            <option value="returned">Devolvidos</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="dueDate">Data de Devolução</option>
            <option value="loanDate">Data de Empréstimo</option>
            <option value="title">Título</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.search || filters.status !== 'all') && (
        <div className="flex items-center gap-2 pt-2">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleSearchChange('')}
                className="h-7 text-xs"
              >
                Busca: "{filters.search}" ×
              </Button>
            )}
            {filters.status !== 'all' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleStatusChange('all')}
                className="h-7 text-xs"
              >
                Status: {filters.status} ×
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}