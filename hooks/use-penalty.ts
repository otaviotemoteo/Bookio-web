import { useState } from "react";
import { penaltyService } from "../lib/services/penalty";
import { CreatePenaltyRequest } from "../types/index";

export function usePenalty() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criar multa
  const createPenalty = async (data: CreatePenaltyRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await penaltyService.createPenalty(data);
      return { success: true, data: response.penality };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao criar multa";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar multa
  const getPenalty = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await penaltyService.getPenalty(id);
      return { success: true, data: response.penality };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao buscar multa";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Pagar multa
  const payPenalty = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await penaltyService.payPenalty(id);
      return { success: true, data: response.penality };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao pagar multa";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createPenalty,
    getPenalty,
    payPenalty,
  };
}
