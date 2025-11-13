"use client";

import { Search, Plus, Book as BookIcon, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import BookCard from "../../../components/library/books/book-card";
import AddBookModal from "../../../components/library/books/add-book-modal";
import EditBookModal from "../../../components/library/books/edit-book-modal";
import { BooksStats } from "../../../components/library/books/books-stats";
import { useLibrary } from "../../../hooks/use-library";
import { useBook } from "../../../hooks/use-book";
import { useAuth } from "../../../hooks/use-auth";
import { Book, BookGender } from "../../../types/index";

export default function BooksPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState<BookGender | "all">(
    "all"
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  const {
    getLibraryBooks,
    searchBookByTitle,
    isLoading: libraryLoading,
  } = useLibrary();
  const { deleteBook, isLoading: bookLoading } = useBook();

  const libraryId = user?.id;

  // Carregar livros da biblioteca quando o usuário estiver disponível
  useEffect(() => {
    if (libraryId) {
      loadBooks();
    }
  }, [libraryId]);

  const loadBooks = async () => {
    if (!libraryId) return;

    const result = await getLibraryBooks(libraryId);
    if (result.success && result.data) {
      setBooks(result.data);
      setFilteredBooks(result.data);
    }
  };

  // Filtrar livros localmente
  useEffect(() => {
    let filtered = books;

    // Filtro por gênero
    if (selectedGender !== "all") {
      filtered = filtered.filter((book) => book.gender === selectedGender);
    }

    // Filtro por busca (local)
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [searchTerm, selectedGender, books]);

  // Buscar por título no banco (quando apertar Enter ou clicar em buscar)
  const handleSearchInDatabase = async () => {
    if (!libraryId) return;

    if (!searchTerm.trim()) {
      loadBooks();
      return;
    }

    const result = await searchBookByTitle(libraryId, searchTerm);
    if (result.success && result.data) {
      setFilteredBooks([result.data]);
    } else {
      setFilteredBooks([]);
    }
  };

  const handleAddBook = () => {
    loadBooks();
    setIsAddModalOpen(false);
  };

  const handleEditBook = () => {
    loadBooks();
    setIsEditModalOpen(false);
  };

  const handleDeleteBook = async (id: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir este livro?");
    if (!confirmed) return;

    const result = await deleteBook(id.toString());
    if (result.success) {
      loadBooks();
    }
  };

  const openEditModal = (book: Book) => {
    setBookToEdit(book);
    setIsEditModalOpen(true);
  };

  const isLoading = authLoading || libraryLoading || bookLoading;
  const uniqueAuthors = new Set(books.map((b) => b.author)).size;

  // Loading inicial
  if (authLoading || !user) {
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
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Gestão do Acervo
        </h1>
        <p className="text-gray-600">
          Gerencie sua biblioteca de forma simples e eficiente
        </p>
      </div>

      {/* Estatísticas */}
      <div className="mb-8">
        <BooksStats
          totalBooks={books.length}
          uniqueAuthors={uniqueAuthors}
          searchResults={filteredBooks.length}
        />
      </div>

      {/* Barra de Ações */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Busca e Adicionar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por título ou autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchInDatabase()}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearchInDatabase}
            disabled={isLoading}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium shadow-md hover:shadow-lg disabled:opacity-50"
          >
            Buscar no Banco
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Adicionar Livro
          </button>
        </div>

        {/* Filtro por Gênero */}
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Filtrar por gênero:
          </span>
          <select
            value={selectedGender}
            onChange={(e) =>
              setSelectedGender(e.target.value as BookGender | "all")
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos</option>
            <option value="Fiction">Ficção</option>
            <option value="NonFiction">Não-ficção</option>
            <option value="Fantasy">Fantasia</option>
            <option value="ScienceFiction">Ficção Científica</option>
            <option value="Mystery">Mistério</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
            <option value="Horror">Terror</option>
            <option value="Biography">Biografia</option>
            <option value="History">História</option>
            <option value="Poetry">Poesia</option>
            <option value="SelfHelp">Autoajuda</option>
          </select>
          {selectedGender !== "all" && (
            <button
              onClick={() => setSelectedGender("all")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Limpar filtro
            </button>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1">
        {isLoading && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando livros...</p>
          </div>
        )}

        {!isLoading && filteredBooks.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <BookIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm || selectedGender !== "all"
                ? "Nenhum livro encontrado com os filtros aplicados"
                : "Nenhum livro cadastrado ainda"}
            </p>
            {!searchTerm && selectedGender === "all" && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Adicionar seu primeiro livro
              </button>
            )}
          </div>
        )}

        {!isLoading && filteredBooks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={openEditModal}
                onDelete={handleDeleteBook}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modais */}
      {libraryId && (
        <>
          <AddBookModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={handleAddBook}
            libraryId={libraryId}
          />

          {bookToEdit && (
            <EditBookModal
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setBookToEdit(null);
              }}
              onSuccess={handleEditBook}
              book={bookToEdit}
            />
          )}
        </>
      )}
    </div>
  );
}
