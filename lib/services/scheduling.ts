import { api } from "./api";
import { CreateSchedulingRequest, SchedulingResponse } from "../../types/index";

class SchedulingService {
  // Criar agendamento
  async createScheduling(
    data: CreateSchedulingRequest
  ): Promise<SchedulingResponse> {
    return api.post("/schedulings", data);
  }

  // Buscar agendamento por ID
  async getScheduling(id: string): Promise<SchedulingResponse> {
    return api.get(`/schedulings/${id}`);
  }

  // Cancelar agendamento
  async cancelScheduling(id: string): Promise<void> {
    return api.delete(`/schedulings/${id}`);
  }
}

export const schedulingService = new SchedulingService();
