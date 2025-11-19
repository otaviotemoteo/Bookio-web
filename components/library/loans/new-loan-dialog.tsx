"use client";

import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Plus, Loader2 } from "lucide-react";
import { CreateLoanRequest } from "../../../types/index";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";

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
      <Dialog open={open} onOpenChange={setOpen}>
        {/* BOTÃO DE ABRIR */}
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Empréstimo
          </Button>
        </DialogTrigger>

        {/* MODAL */}
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Registrar Novo Empréstimo</DialogTitle>
            <DialogDescription>
              Preencha os dados para registrar um novo empréstimo de livro.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
                <p className="text-gray-500 text-sm">Carregando dados...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SELECT LEITOR */}
              <div>
                <Label htmlFor="readerId">
                  Leitor{" "}
                  {readers.length > 0 && `(${readers.length} disponíveis)`}
                </Label>

                <Select
                  value={formData.readerId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, readerId: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um leitor" />
                  </SelectTrigger>

                  <SelectContent>
                    {readers.map((reader) => (
                      <SelectItem key={reader.id} value={String(reader.id)}>
                        {reader.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* SELECT LIVRO */}
              <div>
                <Label htmlFor="bookId">
                  Livro {books.length > 0 && `(${books.length} disponíveis)`}
                </Label>

                <Select
                  value={formData.bookId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, bookId: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um livro" />
                  </SelectTrigger>

                  <SelectContent>
                    {books.map((book) => (
                      <SelectItem key={book.id} value={String(book.id)}>
                        {book.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* DATA DE DEVOLUÇÃO */}
              <div>
                <Label htmlFor="returnDate">Data de Devolução</Label>
                <Input
                  id="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) =>
                    setFormData({ ...formData, returnDate: e.target.value })
                  }
                  required
                />
              </div>

              {/* BOTÕES */}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  disabled={
                    !formData.readerId ||
                    !formData.bookId ||
                    !formData.returnDate
                  }
                >
                  Registrar Empréstimo
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
