"use client";

import React from "react";
import Layout from "../../components/library/books/layout"; // Layout com Sidebar e Header
import BookList from "../../components/library/books/book-list"; // Lista de livros

const BooksPage: React.FC = () => {
  return (
    <Layout>
      {" "}
      {/* Só aqui usamos o Layout que inclui Sidebar e Header */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Gestão do Acervo</h1>

        {/* Botão para navegar para o formulário de adicionar novo livro */}
        <button
          onClick={() => (window.location.href = "/books/add")} // Redireciona para a página de adicionar livro
          className="mb-6 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Criar Novo Livro
        </button>

        {/* Exibe a lista de livros */}
        <BookList />
      </div>
    </Layout>
  );
};

export default BooksPage;
