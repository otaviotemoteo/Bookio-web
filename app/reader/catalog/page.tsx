'use client';

import { useState, useMemo } from 'react';
import { BookCard } from '../../../components/reader/catalog/book-card';
import { BookListItem } from '../../../components/reader/catalog/book-list';
import { CatalogFilters } from '../../../components/reader/catalog/catalog-filters';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { CatalogFilters as CatalogFiltersType } from '../../../types/reader/catalog';
import { BookOpen, Library, Grid3x3, List, Sparkles } from 'lucide-react';
import { mockBooks, mockCategories, mockCatalogStats } from '../../../data/reader/mock-catalog';

type ViewMode = 'grid' | 'list';

export default function CatalogPage() {
  const [filters, setFilters] = useState<CatalogFiltersType>({
    search: '',
    category: '',
    status: 'all',
    sortBy: 'title',
    sortOrder: 'asc',
    language: '',
  });
  
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let result = [...mockBooks];

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        book =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower) ||
          book.isbn.includes(searchLower) ||
          book.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (filters.category) {
      result = result.filter(book => book.categories.includes(filters.category));
    }

    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(book => book.status === filters.status);
    }

    // Filter by language
    if (filters.language) {
      result = result.filter(book => book.language === filters.language);
    }

    // Sort
    result.sort((a, b) => {
      let compareValue = 0;

      switch (filters.sortBy) {
        case 'title':
          compareValue = a.title.localeCompare(b.title);
          break;
        case 'author':
          compareValue = a.author.localeCompare(b.author);
          break;
        case 'publishYear':
          compareValue = a.publishYear - b.publishYear;
          break;
        case 'rating':
          compareValue = b.rating - a.rating;
          break;
      }

      return filters.sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return result;
  }, [filters]);

  const handleReserve = (bookId: string) => {
    console.log('Reservando livro:', bookId);
    // Implementar lógica de reserva
  };

  const handleFavorite = (bookId: string) => {
    console.log('Adicionando aos favoritos:', bookId);
    // Implementar lógica de favoritos
  };

  const handleViewDetails = (bookId: string) => {
    console.log('Ver detalhes do livro:', bookId);
    // Implementar navegação para detalhes
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Catálogo de Livros</h1>
        <p className="text-muted-foreground mt-2">
          Explore nossa coleção completa de livros disponíveis
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-100">
              <Library className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Livros</p>
              <p className="text-2xl font-bold">{mockCatalogStats.totalBooks}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-100">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Disponíveis</p>
              <p className="text-2xl font-bold">{mockCatalogStats.availableBooks}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-purple-100">
              <Grid3x3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Categorias</p>
              <p className="text-2xl font-bold">{mockCatalogStats.categories}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-yellow-100">
              <Sparkles className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Novos</p>
              <p className="text-2xl font-bold">{mockCatalogStats.newArrivals}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <CatalogFilters
        filters={filters}
        categories={mockCategories}
        onFilterChange={setFilters}
      />

      {/* View Mode Toggle & Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Exibindo <span className="font-medium text-foreground">{filteredBooks.length}</span> de{' '}
          <span className="font-medium text-foreground">{mockBooks.length}</span> livros
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Books Grid/List */}
      {filteredBooks.length === 0 ? (
        <Card className="p-12 text-center">
          <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum livro encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Tente ajustar os filtros ou fazer uma busca diferente.
          </p>
          <Button
            variant="outline"
            onClick={() =>
              setFilters({
                search: '',
                category: '',
                status: 'all',
                sortBy: 'title',
                sortOrder: 'asc',
                language: '',
              })
            }
          >
            Limpar Filtros
          </Button>
        </Card>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {filteredBooks.map(book =>
            viewMode === 'grid' ? (
              <BookCard
                key={book.id}
                book={book}
                onReserve={handleReserve}
                onFavorite={handleFavorite}
                onViewDetails={handleViewDetails}
              />
            ) : (
              <BookListItem
                key={book.id}
                book={book}
                onReserve={handleReserve}
                onFavorite={handleFavorite}
                onViewDetails={handleViewDetails}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}