'use client';

import { useState, useMemo } from 'react';
import { FavoriteCard } from '../../../components/reader/favorites/favorites-cards';
import { FavoriteFilters } from '../../../components/reader/favorites/favorites-filter';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { FavoriteFilters as FavoriteFiltersType } from '../../../types/reader/favorites';
import { Heart, BookOpen, Grid3x3, Star, Info } from 'lucide-react';
import { mockFavorites, mockFavoriteStats, mockReadingLists } from '../../../data/reader/mock-favorites';
import { Badge } from '../../../components/ui/badge';

export default function FavoritesPage() {
  const [filters, setFilters] = useState<FavoriteFiltersType>({
    search: '',
    category: '',
    status: 'all',
    sortBy: 'addedDate',
    sortOrder: 'desc',
  });

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(mockFavorites.flatMap(f => f.categories))].sort();
  }, []);

  // Filter and sort favorites
  const filteredFavorites = useMemo(() => {
    let result = [...mockFavorites];

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        fav =>
          fav.bookTitle.toLowerCase().includes(searchLower) ||
          fav.bookAuthor.toLowerCase().includes(searchLower) ||
          fav.isbn.includes(searchLower)
      );
    }

    // Filter by category
    if (filters.category) {
      result = result.filter(fav => fav.categories.includes(filters.category));
    }

    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(fav => fav.status === filters.status);
    }

    // Sort
    result.sort((a, b) => {
      let compareValue = 0;

      switch (filters.sortBy) {
        case 'addedDate':
          compareValue = new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
          break;
        case 'title':
          compareValue = a.bookTitle.localeCompare(b.bookTitle);
          break;
        case 'author':
          compareValue = a.bookAuthor.localeCompare(b.bookAuthor);
          break;
        case 'rating':
          compareValue = b.rating - a.rating;
          break;
      }

      return filters.sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return result;
  }, [filters, categories]);

  const handleRemove = (favoriteId: string) => {
    console.log('Removendo dos favoritos:', favoriteId);
    // Implementar lógica de remoção
  };

  const handleReserve = (bookId: string) => {
    console.log('Reservando livro:', bookId);
    // Implementar lógica de reserva
  };

  const handleAddNote = (favoriteId: string) => {
    console.log('Adicionando nota ao favorito:', favoriteId);
    // Implementar lógica de adicionar/editar nota
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meus Favoritos</h1>
        <p className="text-muted-foreground mt-2">
          Seus livros favoritos em um só lugar
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-red-100">
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Favoritos</p>
              <p className="text-2xl font-bold">{mockFavoriteStats.totalFavorites}</p>
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
              <p className="text-2xl font-bold">{mockFavoriteStats.availableFavorites}</p>
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
              <p className="text-2xl font-bold">{mockFavoriteStats.categories}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-yellow-100">
              <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avaliação Média</p>
              <p className="text-2xl font-bold">{mockFavoriteStats.averageRating}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Reading Lists Info */}
      {mockReadingLists.length > 0 && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Você tem {mockReadingLists.length} lista(s) de leitura criada(s). Organize seus favoritos em listas temáticas!
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <FavoriteFilters
        filters={filters}
        categories={categories}
        onFilterChange={setFilters}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Exibindo <span className="font-medium text-foreground">{filteredFavorites.length}</span> de{' '}
          <span className="font-medium text-foreground">{mockFavorites.length}</span> favoritos
        </p>
      </div>

      {/* Favorites Grid */}
      {filteredFavorites.length === 0 ? (
        <Card className="p-12 text-center">
          <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum favorito encontrado</h3>
          <p className="text-muted-foreground mb-4">
            {filters.search || filters.category || filters.status !== 'all'
              ? 'Tente ajustar os filtros para encontrar o que procura.'
              : 'Você ainda não tem livros favoritos. Explore o catálogo e adicione seus livros preferidos!'}
          </p>
          {(filters.search || filters.category || filters.status !== 'all') && (
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  search: '',
                  category: '',
                  status: 'all',
                  sortBy: 'addedDate',
                  sortOrder: 'desc',
                })
              }
            >
              Limpar Filtros
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFavorites.map(favorite => (
            <FavoriteCard
              key={favorite.id}
              favorite={favorite}
              onRemove={handleRemove}
              onReserve={handleReserve}
              onAddNote={handleAddNote}
            />
          ))}
        </div>
      )}

      {/* Reading Lists Section */}
      {mockReadingLists.length > 0 && (
        <div className="mt-8 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-4">Minhas Listas de Leitura</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockReadingLists.map(list => (
              <Card key={list.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{list.name}</h3>
                  <Badge variant="secondary">{list.bookIds.length}</Badge>
                </div>
                {list.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {list.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Criada em {new Date(list.createdAt).toLocaleDateString('pt-BR')}</span>
                  <Button size="sm" variant="ghost">Ver lista →</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}