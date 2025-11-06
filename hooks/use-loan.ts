import { useState } from "react";
import { loanService } from "../lib/services/loan";
import { CreateLoanRequest } from "../types/index";

export function useLoan() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criar empréstimo
  const createLoan = async (data: CreateLoanRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loanService.createLoan(data);
      return { success: true, data: response.loan };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao criar empréstimo";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Listar todos
  const getAllLoans = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loanService.getAllLoans();
      return { success: true, data: response.loans };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao buscar empréstimos";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar por ID
  const getLoan = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loanService.getLoan(id);
      return { success: true, data: response.loan };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao buscar empréstimo";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Deletar
  const deleteLoan = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await loanService.deleteLoan(id);
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao deletar empréstimo";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar status
  const getLoanStatus = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loanService.getLoanStatus(id);
      return { success: true, data: response };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao verificar status";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createLoan,
    getAllLoans,
    getLoan,
    deleteLoan,
    getLoanStatus,
  };
}
