import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { PaymentFilters as PaymentFiltersType } from '../../../types/reader/payments';
import { Search, SlidersHorizontal } from 'lucide-react';

interface PaymentFiltersProps {
  filters: PaymentFiltersType;
  onFilterChange: (filters: PaymentFiltersType) => void;
}

export function PaymentFilters({ filters, onFilterChange }: PaymentFiltersProps) {
  const handleStatusChange = (status: string) => {
    onFilterChange({
      ...filters,
      status: status as PaymentFiltersType['status'],
    });
  };

  const handleTypeChange = (type: string) => {
    onFilterChange({
      ...filters,
      type: type as PaymentFiltersType['type'],
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
      sortBy: sortBy as PaymentFiltersType['sortBy'],
    });
  };

  return (
    <div className="bg-card rounded-lg border p-4 space-y-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
        <h3 className="font-semibold">Filtros</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pagamento..."
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
            <option value="pending">Pendentes</option>
            <option value="paid">Pagos</option>
            <option value="overdue">Vencidos</option>
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <select
            value={filters.type}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">Todos os Tipos</option>
            <option value="fine">Multas</option>
            <option value="replacement">Reposição</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="dueDate">Data de Vencimento</option>
            <option value="amount">Valor</option>
            <option value="paidDate">Data de Pagamento</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.search || filters.status !== 'all' || filters.type !== 'all') && (
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
            {filters.type !== 'all' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleTypeChange('all')}
                className="h-7 text-xs"
              >
                Tipo: {filters.type} ×
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}