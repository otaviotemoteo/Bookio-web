import { api } from "./api";
import {
  CreateLibraryRequest,
  UpdateLibraryRequest,
  LibraryResponse,
  ReadersListResponse,
  BooksListResponse,
  BookResponse,
  MostBorrowedBooksResponse,
  LoansListResponse,
  PenaltiesListResponse,
  SchedulingsListResponse,
} from "../../types/index";

class LibraryService {
  // Criar biblioteca
  async createLibrary(data: CreateLibraryRequest): Promise<void> {
    return api.post("/library", data);
  }

  // Buscar biblioteca por ID
  async getLibrary(id: string): Promise<LibraryResponse> {
    return api.get(`/library/${id}`);
  }

  // Atualizar biblioteca
  async updateLibrary(
    id: string,
    data: UpdateLibraryRequest
  ): Promise<LibraryResponse> {
    return api.put(`/library/${id}`, data);
  }

  // Deletar biblioteca (via user)
  async deleteLibrary(id: string): Promise<void> {
    return api.delete(`/user/${id}`);
  }

  // Listar leitores da biblioteca
  async getLibraryReaders(libraryId: string): Promise<ReadersListResponse> {
    return api.get(`/library/${libraryId}/readers`);
  }

  // Listar livros da biblioteca
  async getLibraryBooks(libraryId: string): Promise<BooksListResponse> {
    return api.get(`/library/${libraryId}/books`);
  }

  // Listar empréstimos da biblioteca
  async getLibraryLoans(libraryId: string): Promise<LoansListResponse> {
    return api.get(`/library/${libraryId}/loans`);
  }

  // Listar multas da biblioteca
  async getLibraryPenalties(libraryId: string): Promise<PenaltiesListResponse> {
    return api.get(`/library/${libraryId}/penalties`);
  }

  async getLibrarySchedulings(libraryId: string): Promise<SchedulingsListResponse> {
  return api.get(`/library/${libraryId}/schedulings`);
}

  // Buscar livro por título na biblioteca
  async searchBookByTitle(
    libraryId: string,
    title: string
  ): Promise<BookResponse> {
    return api.get(
      `/library/${libraryId}/books/search?title=${encodeURIComponent(title)}`
    );
  }

  // Livros mais emprestados
  async getMostBorrowedBooks(
    libraryId: string
  ): Promise<MostBorrowedBooksResponse> {
    return api.get(`/library/${libraryId}/books/most-borrowed`);
  }
}

export const libraryService = new LibraryService();
