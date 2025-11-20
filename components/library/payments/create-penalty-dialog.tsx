import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useToast } from "../../ui/use-toast";
import { usePenalty } from "../../../hooks/use-penalty";

interface Reader {
  id: string;
  name: string;
  email: string;
}

interface Loan {
  id: string;
  bookTitle: string;
  loanDate: string;
  dueDate: string;
  status: string;
}

interface CreatePenaltyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  readers: Reader[];
}

export const CreatePenaltyDialog: React.FC<CreatePenaltyDialogProps> = ({
  isOpen,
  onClose,
  onSuccess,
  readers,
}) => {
  const { toast } = useToast();
  const { createPenalty, isLoading } = usePenalty();

  const [selectedReaderId, setSelectedReaderId] = useState("");
  const [loans, setLoans] = useState<Loan[]>([]);
  const [selectedLoanId, setSelectedLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isLoadingLoans, setIsLoadingLoans] = useState(false);

  // Resetar form ao abrir/fechar
  useEffect(() => {
    if (!isOpen) {
      setSelectedReaderId("");
      setLoans([]);
      setSelectedLoanId("");
      setAmount("");
      setDueDate("");
    }
  }, [isOpen]);

  // Carregar empréstimos quando selecionar um reader
  useEffect(() => {
    const loadLoans = async () => {
      if (!selectedReaderId) {
        setLoans([]);
        setSelectedLoanId("");
        return;
      }

      setIsLoadingLoans(true);
      try {
        console.log("📤 Carregando empréstimos do reader:", selectedReaderId);
        const response = await fetch(`/api/reader/${selectedReaderId}/loans`);

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Empréstimos carregados:", data);
          setLoans(data.loans || []);
        } else {
          console.error("❌ Erro ao buscar empréstimos");
          toast({
            title: "Erro",
            description: "Erro ao carregar empréstimos do leitor",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("❌ Erro ao carregar empréstimos:", error);
        toast({
          title: "Erro",
          description: "Erro ao carregar empréstimos do leitor",
          variant: "destructive",
        });
      } finally {
        setIsLoadingLoans(false);
      }
    };

    loadLoans();
  }, [selectedReaderId, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedReaderId || !selectedLoanId || !amount || !dueDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para criar a multa",
        variant: "destructive",
      });
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      toast({
        title: "Valor inválido",
        description: "O valor da multa deve ser maior que zero",
        variant: "destructive",
      });
      return;
    }

    const result = await createPenalty({
      readerId: selectedReaderId,
      loanId: selectedLoanId,
      amount: amountNumber,
      dueDate,
    });

    if (result.success) {
      toast({
        title: "Sucesso!",
        description: "Multa criada com sucesso",
      });
      onSuccess();
      onClose();
    } else {
      toast({
        title: "Erro",
        description: result.error || "Erro ao criar multa",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Nova Multa</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para criar uma nova multa
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reader Selection */}
          <div className="space-y-2">
            <Label htmlFor="reader">Leitor *</Label>
            <Select
              value={selectedReaderId}
              onValueChange={setSelectedReaderId}
            >
              <SelectTrigger id="reader">
                <SelectValue placeholder="Selecione um leitor" />
              </SelectTrigger>
              <SelectContent>
                {readers.map((reader) => (
                  <SelectItem key={reader.id} value={reader.id}>
                    {reader.name} ({reader.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Loan Selection */}
          <div className="space-y-2">
            <Label htmlFor="loan">Empréstimo *</Label>
            <Select
              value={selectedLoanId}
              onValueChange={setSelectedLoanId}
              disabled={!selectedReaderId || isLoadingLoans}
            >
              <SelectTrigger id="loan">
                <SelectValue
                  placeholder={
                    !selectedReaderId
                      ? "Selecione um leitor primeiro"
                      : isLoadingLoans
                      ? "Carregando empréstimos..."
                      : "Selecione um empréstimo"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {loans.length === 0 ? (
                  <div className="p-2 text-sm text-gray-500 text-center">
                    Nenhum empréstimo encontrado
                  </div>
                ) : (
                  loans.map((loan) => (
                    <SelectItem key={loan.id} value={loan.id}>
                      {loan.bookTitle} - {loan.status}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$) *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate">Data de Vencimento *</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Criando..." : "Criar Multa"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
