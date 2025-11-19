import { useState } from "react";
import { schedulingService } from "../lib/services/scheduling";
import { CreateSchedulingRequest } from "../types/index";

export function useScheduling() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criar agendamento
  const createScheduling = async (data: CreateSchedulingRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await schedulingService.createScheduling(data);
      return { success: true, data: response.scheduling };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao criar agendamento";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar agendamento
  const getScheduling = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await schedulingService.getScheduling(id);
      return { success: true, data: response.scheduling };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao buscar agendamento";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Cancelar agendamento
  const cancelScheduling = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await schedulingService.deleteScheduling(id);
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao cancelar agendamento";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createScheduling,
    getScheduling,
    cancelScheduling,
  };
}
