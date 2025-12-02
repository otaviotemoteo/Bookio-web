import { useState } from "react";
import { readerService } from "../lib/services/reader";
import { CreateReaderRequest, UpdateReaderRequest } from "../types/index";

export function useReader() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listar leitores
  const listReaders = async (libraryId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await readerService.listReaders(libraryId);
      return { success: true, data: response.readers };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao listar leitores";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Criar leitor
  const createReader = async (data: CreateReaderRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      await readerService.createReader(data);
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao criar leitor";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar leitor
  const getReader = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await readerService.getReader(id);
      return { success: true, data: response.reader };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao buscar leitor";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar leitor
  const updateReader = async (
    id: string,
    data: UpdateReaderRequest,
    picture?: File
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await readerService.updateReader(id, data, picture);
      return { success: true, data: response.reader };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao atualizar leitor";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Deletar leitor (recebe userId)
  const deleteReader = async (userId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await readerService.deleteReader(userId);
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao deletar leitor";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Listar empréstimos do leitor
  const getReaderLoans = async (readerId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await readerService.getReaderLoans(readerId);
      return { success: true, data: response.loans };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao buscar empréstimos";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Listar multas do leitor
  const getReaderPenalties = async (readerId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await readerService.getReaderPenalties(readerId);
      return { success: true, data: response.penalities };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao buscar multas";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Listar agendamentos do leitor
  const getReaderSchedulings = async (readerId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await readerService.getReaderSchedulings(readerId);
      return { success: true, data: response.schedulings };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao buscar agendamentos";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    listReaders,
    createReader,
    getReader,
    updateReader,
    deleteReader,
    getReaderLoans,
    getReaderPenalties,
    getReaderSchedulings,
  };
}
