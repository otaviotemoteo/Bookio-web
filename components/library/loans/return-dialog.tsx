'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Textarea } from '../../ui/textarea';
import { ReturnFormData } from '../../../types/loans';

interface ReturnDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loanId: string;
  bookTitle: string;
  onSubmit: (data: ReturnFormData) => void;
}

export function ReturnDialog({
  open,
  onOpenChange,
  loanId,
  bookTitle,
  onSubmit
}: ReturnDialogProps) {
  const [formData, setFormData] = useState<ReturnFormData>({
    loanId,
    returnDate: new Date().toISOString().split('T')[0],
    condition: 'good',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Devolução</DialogTitle>
          <DialogDescription>
            Livro: <strong>{bookTitle}</strong>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Label>Condição do Livro</Label>
            <RadioGroup
              value={formData.condition}
              onValueChange={(value) => 
                setFormData({ ...formData, condition: value as 'good' | 'damaged' | 'lost' })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="good" />
                <Label htmlFor="good" className="font-normal cursor-pointer">
                  Boa - Sem danos
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="damaged" id="damaged" />
                <Label htmlFor="damaged" className="font-normal cursor-pointer">
                  Danificado - Possui danos visíveis
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lost" id="lost" />
                <Label htmlFor="lost" className="font-normal cursor-pointer">
                  Perdido - Livro não foi devolvido
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Adicione observações sobre a devolução..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          {formData.condition === 'damaged' && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                ⚠️ Livros danificados podem gerar multa de até R$ 50,00
              </p>
            </div>
          )}

          {formData.condition === 'lost' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">
                ⚠️ Livros perdidos requerem reposição ou pagamento do valor integral
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Confirmar Devolução</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}