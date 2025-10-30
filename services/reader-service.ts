import { Reader, CreateReaderData } from "../types/library/reader";

export class ReadersService {
  private static async getAuthHeaders() {
    // O token está nos cookies httpOnly, então não precisa passar manualmente
    // O Next.js vai automaticamente incluir os cookies na requisição
    return {
      "Content-Type": "application/json",
    };
  }

  static async listReaders(libraryId: string): Promise<Reader[]> {
    const response = await fetch(`/api/library/${libraryId}/readers`, {
      method: "GET",
      credentials: "include", // Importante para incluir cookies httpOnly
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erro ao buscar leitores");
    }

    const data = await response.json();
    // A API pode retornar os leitores diretamente ou dentro de uma propriedade
    // Ajuste conforme necessário baseado na resposta real da sua API
    return Array.isArray(data) ? data : data.readers || [];
  }

  static async createReader(
    data: CreateReaderData,
    picture?: File
  ): Promise<Reader> {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (picture) {
      formData.append("picture", picture);
    }

    const response = await fetch("/api/reader", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erro ao criar leitor");
    }

    return await response.json();
  }

  static async updateReader(
    readerId: string,
    data: CreateReaderData,
    picture?: File
  ): Promise<Reader> {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (picture) {
      formData.append("picture", picture);
    }

    const response = await fetch(`/api/reader/${readerId}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erro ao atualizar leitor");
    }

    return await response.json();
  }

  static async deleteReader(userId: string): Promise<void> {
    const response = await fetch(`/api/user/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erro ao excluir leitor");
    }
  }
}