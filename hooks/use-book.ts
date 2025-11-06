import { useState } from "react";
import { bookService } from "../lib/services/book";
import {
  CreateBookRequest,
  UpdateBookRequest,
  BookGender,
} from "../types/index";

export function useBook() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criar livro
  const createBook = async (data: CreateBookRequest, image?: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await bookService.createBook(data, image);
      return { success: true, data: response.book };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao criar livro";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar livro
  const getBook = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await bookService.getBook(id);
      return { success: true, data: response.book };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao buscar livro";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar livro
  const updateBook = async (
    id: string,
    data: UpdateBookRequest,
    image?: File
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await bookService.updateBook(id, data, image);
      return { success: true, data: response.book };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao atualizar livro";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Deletar livro
  const deleteBook = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await bookService.deleteBook(id);
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao deletar livro";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar por gênero
  const getBooksByGender = async (gender: BookGender) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await bookService.getBooksByGender(gender);
      return { success: true, data: response.books };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao buscar livros por gênero";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createBook,
    getBook,
    updateBook,
    deleteBook,
    getBooksByGender,
  };
}
