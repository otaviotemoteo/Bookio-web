import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { CatalogFilters as CatalogFiltersType, Category } from '../../../types/reader/catalog';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface CatalogFiltersProps {
  filters: CatalogFiltersType;
  categories: Category[];
  onFilterChange: (filters: CatalogFiltersType) => void;
}

export function CatalogFilters({ filters, categories, onFilterChange }: CatalogFiltersProps) {
  const handleSearchChange = (search: string) => {
    onFilterChange({ ...filters, search });
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({ ...filters, category });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({ ...filters, status: status as CatalogFiltersType['status'] });
  };

  const handleSortChange = (sortBy: string) => {
    onFilterChange({ ...filters, sortBy: sortBy as CatalogFiltersType['sortBy'] });
  };

  const handleLanguageChange = (language: string) => {
    onFilterChange({ ...filters, language });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      category: '',
      status: 'all',
      sortBy: 'title',
      sortOrder: 'asc',
      language: '',
    });
  };

  const hasActiveFilters = 
    filters.search || 
    filters.category || 
    filters.status !== 'all' || 
    filters.language;

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, autor, ISBN..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-12 h-12 text-base"
          />
        </div>
      </Card>

      {/* Advanced Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold">Filtros Avançados</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="ml-auto text-xs"
            >
              <X className="w-3 h-3 mr-1" />
              Limpar filtros
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Categoria</label>
            <select
              value={filters.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="">Todas as categorias</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name} ({cat.count})
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Disponibilidade</label>
            <select
              value={filters.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="all">Todos</option>
              <option value="available">Disponíveis</option>
              <option value="unavailable">Indisponíveis</option>
              <option value="reserved">Reservados</option>
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Idioma</label>
            <select
              value={filters.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="">Todos os idiomas</option>
              <option value="Português">Português</option>
              <option value="Inglês">Inglês</option>
              <option value="Espanhol">Espanhol</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="text-sm font-medium mb-2 block">Ordenar por</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="title">Título</option>
              <option value="author">Autor</option>
              <option value="publishYear">Ano de publicação</option>
              <option value="rating">Avaliação</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Badge variant="secondary" className="gap-1">
                  Busca: "{filters.search}"
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => handleSearchChange('')}
                  />
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary" className="gap-1">
                  {filters.category}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => handleCategoryChange('')}
                  />
                </Badge>
              )}
              {filters.status !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  Status: {filters.status}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => handleStatusChange('all')}
                  />
                </Badge>
              )}
              {filters.language && (
                <Badge variant="secondary" className="gap-1">
                  {filters.language}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => handleLanguageChange('')}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}