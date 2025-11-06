import { api } from "./api";
import {
  CreateReaderRequest,
  UpdateReaderRequest,
  ReaderResponse,
  LoansListResponse,
  PenaltiesListResponse,
  SchedulingsListResponse,
} from "../../types/index";

class ReaderService {
  // Criar leitor
  async createReader(data: CreateReaderRequest, picture?: File): Promise<void> {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (picture) {
      formData.append("picture", picture);
    }

    return api.uploadFile("/reader", formData);
  }

  // Buscar leitor por ID
  async getReader(id: string): Promise<ReaderResponse> {
    return api.get(`/reader/${id}`);
  }

  // Atualizar leitor
  async updateReader(
    id: string,
    data: UpdateReaderRequest,
    picture?: File
  ): Promise<ReaderResponse> {
    const formData = new FormData();

    if (Object.keys(data).length > 0) {
      formData.append("data", JSON.stringify(data));
    }

    if (picture) {
      formData.append("picture", picture);
    }

    return api.updateWithFile(`/reader/${id}`, formData);
  }

  // Listar empréstimos do leitor
  async getReaderLoans(readerId: string): Promise<LoansListResponse> {
    return api.get(`/reader/${readerId}/loans`);
  }

  // Listar multas do leitor
  async getReaderPenalties(readerId: string): Promise<PenaltiesListResponse> {
    return api.get(`/reader/${readerId}/penalties`);
  }

  // Listar agendamentos do leitor
  async getReaderSchedulings(
    readerId: string
  ): Promise<SchedulingsListResponse> {
    return api.get(`/reader/${readerId}/schedulings`);
  }
}

export const readerService = new ReaderService();
