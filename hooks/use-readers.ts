import { useState } from "react";
import {
  Reader,
  CreateReaderData,
  UpdateReaderData,
} from "../types/library/reader";

export function useReaders(libraryId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GET /api/library/{libraryId}/readers
  const fetchReaders = async (): Promise<Reader[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/library/${libraryId}/readers`);
      if (!response.ok) throw new Error("Erro ao buscar leitores");
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // GET /api/readers/{readerId}
  const fetchReaderById = async (readerId: string): Promise<Reader> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/readers/${readerId}`);
      if (!response.ok) throw new Error("Erro ao buscar leitor");
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // POST /api/readers
  const createReader = async (
    data: CreateReaderData,
    picture?: File
  ): Promise<Reader> => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (picture) {
        formData.append("picture", picture);
      }

      const response = await fetch("/api/readers", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao criar leitor");
      const newReader = await response.json();
      return newReader;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // PATCH /api/readers/{readerId}
  const updateReader = async (
    readerId: string,
    data: UpdateReaderData,
    picture?: File
  ): Promise<Reader> => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (picture) {
        formData.append("picture", picture);
      }

      const response = await fetch(`/api/readers/${readerId}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao atualizar leitor");
      const updatedReader = await response.json();
      return updatedReader;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE /api/readers/{readerId}
  const deleteReader = async (readerId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/readers/${readerId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir leitor");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchReaders,
    fetchReaderById,
    createReader,
    updateReader,
    deleteReader,
    isLoading,
    error,
  };
}
