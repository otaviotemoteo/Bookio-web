"use client";

import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Plus, Loader2 } from "lucide-react";
import { CreateLoanRequest } from "../../../types/index";

interface NewLoanDialogProps {
  libraryId: string;
  onSubmit: (data: CreateLoanRequest) => void;
}

interface Reader {
  id: string;
  name: string;
  email: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  available: number;
}

export function NewLoanDialog({ libraryId, onSubmit }: NewLoanDialogProps) {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [readers, setReaders] = useState<Reader[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [formData, setFormData] = useState<CreateLoanRequest>({
    readerId: "",
    bookId: "",
    returnDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  });

  useEffect(() => {
    if (open) {
      setTimeout(() => setIsVisible(true), 10);
      loadData();
    } else {
      setIsVisible(false);
    }
  }, [open]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      console.log("📤 Buscando readers e books...");

      // Buscar readers e books em paralelo
      const [readersRes, booksRes] = await Promise.all([
        fetch(`/api/library/${libraryId}/readers`),
        fetch(`/api/library/${libraryId}/books`),
      ]);

      console.log("📥 Readers response:", readersRes.status);
      console.log("📥 Books response:", booksRes.status);

      if (readersRes.ok) {
        const readersData = await readersRes.json();
        console.log("✅ Readers data:", readersData);
        const readersList = readersData.readers || [];
        console.log("👥 Setando readers:", readersList);
        setReaders(readersList);
      } else {
        console.error("❌ Erro ao buscar readers:", await readersRes.text());
      }

      if (booksRes.ok) {
        const booksData = await booksRes.json();
        console.log("✅ Books data:", booksData);
        // Filtrar apenas livros disponíveis
        const availableBooks = (booksData.books || []).filter(
          (book: Book) => book.available > 0
        );
        console.log("📚 Livros disponíveis:", availableBooks);
        setBooks(availableBooks);
      } else {
        console.error("❌ Erro ao buscar books:", await booksRes.text());
      }
    } catch (error) {
      console.error("❌ Erro ao carregar dados:", error);
    } finally {
      console.log("✅ Loading finalizado!");
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setOpen(false), 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    handleClose();
    setFormData({
      readerId: "",
      bookId: "",
      returnDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Novo Empréstimo
      </Button>

      {open && (
        <div
          className={`fixed inset-0 z-[9999] flex justify-center items-center p-4 transition-opacity duration-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={handleClose}
        >
          <div
            className={`bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-200 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                Registrar Novo Empréstimo
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Preencha os dados para registrar um novo empréstimo de livro.
              </p>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label
                      htmlFor="readerId"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Leitor{" "}
                      {readers.length > 0 && `(${readers.length} disponíveis)`}
                    </Label>
                    <select
                      id="readerId"
                      value={formData.readerId}
                      onChange={(e) => {
                        console.log("🔄 Leitor selecionado:", e.target.value);
                        setFormData({ ...formData, readerId: e.target.value });
                      }}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white text-gray-900"
                    >
                      <option value="">Selecione um leitor</option>
                      {readers.map((reader) => (
                        <option key={reader.id} value={reader.id}>
                          {reader.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label
                      htmlFor="bookId"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Livro{" "}
                      {books.length > 0 && `(${books.length} disponíveis)`}
                    </Label>
                    <select
                      id="bookId"
                      value={formData.bookId}
                      onChange={(e) => {
                        console.log("🔄 Livro selecionado:", e.target.value);
                        setFormData({ ...formData, bookId: e.target.value });
                      }}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white text-gray-900"
                    >
                      <option value="">Selecione um livro</option>
                      {books.map((book) => (
                        <option key={book.id} value={String(book.id)}>
                          {book.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label
                      htmlFor="returnDate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Data de Devolução
                    </Label>
                    <input
                      id="returnDate"
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) =>
                        setFormData({ ...formData, returnDate: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={
                        !formData.readerId ||
                        !formData.bookId ||
                        !formData.returnDate
                      }
                      className="px-5 py-2.5 text-white rounded-lg transition-all font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "rgb(58, 123, 236)" }}
                      onMouseEnter={(e) =>
                        !formData.readerId ||
                        !formData.bookId ||
                        !formData.returnDate
                          ? null
                          : (e.currentTarget.style.backgroundColor =
                              "rgb(48, 108, 206)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgb(58, 123, 236)")
                      }
                    >
                      Registrar Empréstimo
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
