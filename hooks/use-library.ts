import { useState } from "react";
import { libraryService } from "../lib/services/library";
import {
  CreateLibraryRequest,
  UpdateLibraryRequest,
  Library,
  Reader,
  BookSimple,
  Book,
  MostBorrowedBook,
} from "../types/index";

export function useLibrary() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criar biblioteca
  const createLibrary = async (data: CreateLibraryRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      await libraryService.createLibrary(data);
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao criar biblioteca";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar biblioteca
  const getLibrary = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await libraryService.getLibrary(id);
      return { success: true, data: response.library };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao buscar biblioteca";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar biblioteca
  const updateLibrary = async (id: string, data: UpdateLibraryRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await libraryService.updateLibrary(id, data);
      return { success: true, data: response.library };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao atualizar biblioteca";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Deletar biblioteca
  const deleteLibrary = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await libraryService.deleteLibrary(id);
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao excluir biblioteca";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Listar leitores
  const getLibraryReaders = async (libraryId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await libraryService.getLibraryReaders(libraryId);
      return { success: true, data: response.readers };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao buscar leitores";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Listar livros
  const getLibraryBooks = async (libraryId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await libraryService.getLibraryBooks(libraryId);
      return { success: true, data: response.books };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao buscar livros";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar por título
  const searchBookByTitle = async (libraryId: string, title: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await libraryService.searchBookByTitle(libraryId, title);
      return { success: true, data: response.book };
    } catch (err: any) {
      const errorMessage = err.message || "Livro não encontrado";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Livros mais emprestados
  const getMostBorrowedBooks = async (libraryId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await libraryService.getMostBorrowedBooks(libraryId);
      return { success: true, data: response.books };
    } catch (err: any) {
      const errorMessage =
        err.message || "Erro ao buscar livros mais emprestados";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createLibrary,
    getLibrary,
    updateLibrary,
    deleteLibrary,
    getLibraryReaders,
    getLibraryBooks,
    searchBookByTitle,
    getMostBorrowedBooks,
  };
}
