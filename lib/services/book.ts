import { api } from "./api";
import {
  CreateBookRequest,
  UpdateBookRequest,
  BookResponse,
  BooksListResponse,
  BookGender,
} from "../../types/index";

class BookService {
  // Criar livro
  async createBook(
    data: CreateBookRequest,
    image?: File
  ): Promise<BookResponse> {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (image) {
      formData.append("image", image);
    }

    console.log("📦 Criando livro:", data.title);

    return api.uploadFile("/books", formData);
  }

  // Buscar livro por ID
  async getBook(id: string): Promise<BookResponse> {
    return api.get(`/books/${id}`);
  }

  // Atualizar livro
  async updateBook(
    id: string,
    data: UpdateBookRequest,
    image?: File
  ): Promise<BookResponse> {
    const formData = new FormData();

    if (Object.keys(data).length > 0) {
      formData.append("data", JSON.stringify(data));
    }

    if (image) {
      formData.append("image", image);
    }

    return api.updateWithFile(`/books/${id}`, formData);
  }

  // Deletar livro
  async deleteBook(id: string): Promise<void> {
    return api.delete(`/books/${id}`);
  }

  // Buscar livros por gênero
  async getBooksByGender(gender: BookGender): Promise<BooksListResponse> {
    return api.get(`/books/gender/${gender}`);
  }
}

export const bookService = new BookService();
