import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "../../ui/use-toast";
import { CreateSchedulingRequest } from "../../../types/index";

interface Reader {
  id: string;
  name: string;
  email?: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  available: number;
}

interface AddSchedulingDialogProps {
  libraryId: string;
  onAddScheduling: (data: CreateSchedulingRequest) => Promise<void>;
}

const AddSchedulingDialog: React.FC<AddSchedulingDialogProps> = ({
  libraryId,
  onAddScheduling,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedReader, setSelectedReader] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [readers, setReaders] = useState<Reader[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Carregar readers e books quando o dialog abrir
  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open]);

  const loadData = async () => {
    setIsLoadingData(true);
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
        toast({
          title: "Erro ao carregar leitores",
          description: "Não foi possível carregar a lista de leitores",
          variant: "destructive",
        });
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
        toast({
          title: "Erro ao carregar livros",
          description: "Não foi possível carregar a lista de livros",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("❌ Erro ao carregar dados:", error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados necessários",
        variant: "destructive",
      });
    } finally {
      console.log("✅ Loading finalizado!");
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedReader || !selectedBook) {
      toast({
        title: "Campos obrigatórios",
        description: "Selecione um leitor e um livro",
        variant: "destructive",
      });
      return;
    }

    const schedulingData: CreateSchedulingRequest = {
      readerId: selectedReader,
      bookId: selectedBook,
    };

    setIsSubmitting(true);
    try {
      await onAddScheduling(schedulingData);
      toast({
        title: "Agendamento criado",
        description: "O agendamento foi criado com sucesso",
      });
      setOpen(false);
      setSelectedReader("");
      setSelectedBook("");
    } catch (error) {
      // Erro já tratado no onAddScheduling
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Agendamento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Novo Agendamento</DialogTitle>
          <DialogDescription>
            Adicione um agendamento para retirada de livro
          </DialogDescription>
        </DialogHeader>

        {isLoadingData ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
              <p className="text-gray-500 text-sm">Carregando dados...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reader">Leitor</Label>
              <Select
                value={selectedReader}
                onValueChange={setSelectedReader}
                disabled={readers.length === 0}
              >
                <SelectTrigger id="reader">
                  <SelectValue
                    placeholder={
                      readers.length === 0
                        ? "Nenhum leitor disponível"
                        : "Selecione um leitor"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {readers.map((reader) => (
                    <SelectItem key={reader.id} value={reader.id}>
                      {reader.name}
                      {reader.email && ` (${reader.email})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="book">Livro</Label>
              <Select
                value={selectedBook}
                onValueChange={setSelectedBook}
                disabled={books.length === 0}
              >
                <SelectTrigger id="book">
                  <SelectValue
                    placeholder={
                      books.length === 0
                        ? "Nenhum livro disponível"
                        : "Selecione um livro"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {books.map((book) => (
                    <SelectItem key={book.id} value={book.id.toString()}>
                      {book.title} - {book.author} ({book.available} disponível
                      {book.available > 1 ? "is" : ""})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoadingData || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Criando...
              </>
            ) : (
              "Criar Agendamento"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSchedulingDialog;
