"use client";

import React, { useState } from "react";
import Layout from "../../../components/library/books/layout"; // Layout com Sidebar e Header
import BookForm from "../../../components/library/books/book-form"; // Formulário de edição de livro

const EditBookPage: React.FC = () => {
  // Dados mockados, você pode substituir pela lógica de busca de um livro por ID
  const [book, setBook] = useState({
    id: 1,
    title: "1984",
    author: "George Orwell",
  });

  const handleSaveBook = (title: string, author: string) => {
    console.log("Livro editado:", title, author);
    // Aqui você pode adicionar a lógica para editar o livro (API ou armazenamento local)
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Editar Livro</h1>

        {/* Formulário de edição de livro, passando os dados atuais do livro */}
        <BookForm onSave={handleSaveBook} book={book} />
      </div>
    </Layout>
  );
};

export default EditBookPage;
