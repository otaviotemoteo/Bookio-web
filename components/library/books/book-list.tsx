import React, { useState } from "react";
import BookCard from "./book-card";

interface Book {
  id: number;
  title: string;
  author: string;
}

const BookList: React.FC = () => {
  // Dados mockados
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "O Senhor dos Anéis", author: "J.R.R. Tolkien" },
    { id: 2, title: "1984", author: "George Orwell" },
    { id: 3, title: "A Revolução dos Bichos", author: "George Orwell" },
  ]);

  // Função para excluir um livro
  const handleDelete = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // Função para editar um livro (simulada)
  const handleEdit = (id: number) => {
    console.log(`Editar livro com id: ${id}`);
    // Aqui você pode implementar a lógica para editar o livro
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default BookList;
