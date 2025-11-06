import { api } from "./api";
import { CreatePenaltyRequest, PenaltyResponse } from "../../types/index";

class PenaltyService {
  // Criar multa
  async createPenalty(data: CreatePenaltyRequest): Promise<PenaltyResponse> {
    return api.post("/penalties", data);
  }

  // Buscar multa por ID
  async getPenalty(id: string): Promise<PenaltyResponse> {
    return api.get(`/penalties/${id}`);
  }

  // Pagar multa
  async payPenalty(id: string): Promise<PenaltyResponse> {
    return api.patch(`/penalties/${id}/pay`, {});
  }
}

export const penaltyService = new PenaltyService();
