"use client";

import React from "react";
import Layout from "../../../components/library/books/layout"; // Layout com Sidebar e Header
import BookForm from "../../../components/library/books/book-form"; // Formulário de criação de livro

const AddBookPage: React.FC = () => {
  const handleSaveBook = (title: string, author: string) => {
    console.log("Novo livro salvo:", title, author);
    // Aqui você pode adicionar a lógica para salvar o livro (API ou armazenamento local)
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Adicionar Novo Livro</h1>

        {/* Formulário para adicionar livro */}
        <BookForm onSave={handleSaveBook} />
      </div>
    </Layout>
  );
};

export default AddBookPage;
