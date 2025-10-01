"use client";

import React, { useState } from "react";
import BookCard from "./book-card"; // Componente para exibir um livro

interface Book {
  id: number;
  title: string;
  author: string;
}

interface BookListProps {
  onEdit: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ onEdit }) => {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          onEdit={() => onEdit(book)} // Passa o livro para o modal de edição
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default BookList;
