'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Plus } from 'lucide-react';
import { LoanFormData } from '../../../types/loans';

interface NewLoanDialogProps {
  onSubmit: (data: LoanFormData) => void;
}

export function NewLoanDialog({ onSubmit }: NewLoanDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<LoanFormData>({
    userId: '',
    bookId: '',
    loanDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
    setFormData({
      userId: '',
      bookId: '',
      loanDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Empréstimo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Novo Empréstimo</DialogTitle>
          <DialogDescription>
            Preencha os dados para registrar um novo empréstimo de livro.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">ID do Usuário</Label>
            <Input
              id="userId"
              placeholder="Digite o ID do usuário"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bookId">ID do Livro</Label>
            <Input
              id="bookId"
              placeholder="Digite o ID do livro"
              value={formData.bookId}
              onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loanDate">Data de Empréstimo</Label>
              <Input
                id="loanDate"
                type="date"
                value={formData.loanDate}
                onChange={(e) => setFormData({ ...formData, loanDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data de Devolução</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Registrar Empréstimo</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}