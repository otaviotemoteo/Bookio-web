import React, { useState } from "react";
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
import { Plus } from "lucide-react";
import { mockReaders } from "../../../data/library/mock-readers";
import { useToast } from "../../ui/use-toast";

interface AddReservationDialogProps {
  onAddReservation: (readerId: string, bookId: string) => void;
}

const AddReservationDialog: React.FC<AddReservationDialogProps> = ({
  onAddReservation,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedReader, setSelectedReader] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const { toast } = useToast();

  // Mock de livros disponíveis
  const availableBooks = [
    { id: "b1", title: "1984", author: "George Orwell" },
    { id: "b2", title: "O Senhor dos Anéis", author: "J.R.R. Tolkien" },
    { id: "b3", title: "Dom Casmurro", author: "Machado de Assis" },
    { id: "b4", title: "Harry Potter", author: "J.K. Rowling" },
    { id: "b5", title: "A Revolução dos Bichos", author: "George Orwell" },
    { id: "b6", title: "Cem Anos de Solidão", author: "Gabriel García Márquez" },
  ];

  const handleSubmit = () => {
    if (!selectedReader || !selectedBook) {
      toast({
        title: "Campos obrigatórios",
        description: "Selecione um leitor e um livro",
        variant: "destructive",
      });
      return;
    }

    onAddReservation(selectedReader, selectedBook);
    toast({
      title: "Reserva criada",
      description: "A reserva foi adicionada com sucesso",
    });
    setOpen(false);
    setSelectedReader("");
    setSelectedBook("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Reserva
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Reserva</DialogTitle>
          <DialogDescription>
            Adicione uma reserva para um leitor presencial
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reader">Leitor</Label>
            <Select value={selectedReader} onValueChange={setSelectedReader}>
              <SelectTrigger id="reader">
                <SelectValue placeholder="Selecione um leitor" />
              </SelectTrigger>
              <SelectContent>
                {mockReaders.map((reader) => (
                  <SelectItem key={reader.id} value={reader.id}>
                    {reader.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="book">Livro</Label>
            <Select value={selectedBook} onValueChange={setSelectedBook}>
              <SelectTrigger id="book">
                <SelectValue placeholder="Selecione um livro" />
              </SelectTrigger>
              <SelectContent>
                {availableBooks.map((book) => (
                  <SelectItem key={book.id} value={book.id}>
                    {book.title} - {book.author}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Criar Reserva</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddReservationDialog;