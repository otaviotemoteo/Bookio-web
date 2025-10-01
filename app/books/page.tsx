"use client";

import { Search, Plus, Book } from "lucide-react";
import { useState } from "react";
import BookCard from "../../components/library/books/book-card";
import AddBookModal from "../../components/library/books/add-book-modal";
import EditBookModal from "../../components/library/books/edit-book-modal";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "O Senhor dos Anéis", author: "J.R.R. Tolkien" },
    { id: 2, title: "1984", author: "George Orwell" },
    { id: 3, title: "A Revolução dos Bichos", author: "George Orwell" },
    { id: 4, title: "Dom Casmurro", author: "Machado de Assis" },
    {
      id: 5,
      title: "Harry Potter e a Pedra Filosofal",
      author: "J.K. Rowling",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  // Adicionar novo livro
  const handleAddBook = (title: string, author: string) => {
    const newBook: Book = {
      id: Math.max(...books.map((b) => b.id), 0) + 1,
      title,
      author,
    };
    setBooks([...books, newBook]);
  };

  // Editar livro
  const handleEditBook = (title: string, author: string) => {
    if (bookToEdit) {
      setBooks(
        books.map((book) =>
          book.id === bookToEdit.id ? { ...book, title, author } : book
        )
      );
    }
  };

  // Excluir livro
  const handleDeleteBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // Abrir modal de edição
  const openEditModal = (book: Book) => {
    setBookToEdit(book);
    setIsEditModalOpen(true);
  };

  // Filtrar livros pela busca
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gestão do Acervo
          </h1>
          <p className="text-gray-600">
            Gerencie sua biblioteca de forma simples e eficiente
          </p>
        </div>

        {/* Barra de Ações */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por título ou autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Adicionar Livro
          </button>
        </div>

        {/* Lista de Livros */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm
                ? "Nenhum livro encontrado"
                : "Nenhum livro cadastrado ainda"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Adicionar seu primeiro livro
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                onEdit={openEditModal}
                onDelete={handleDeleteBook}
              />
            ))}
          </div>
        )}

        {/* Estatísticas */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">{books.length}</p>
              <p className="text-gray-600 mt-1">Total de Livros</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">
                {new Set(books.map((b) => b.author)).size}
              </p>
              <p className="text-gray-600 mt-1">Autores Únicos</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">
                {filteredBooks.length}
              </p>
              <p className="text-gray-600 mt-1">Resultados da Busca</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modais */}
      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddBook}
      />

      {bookToEdit && (
        <EditBookModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditBook}
          book={bookToEdit}
        />
      )}
    </div>
  );
}
