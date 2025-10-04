'use client';

import { useState, useEffect } from 'react';
import { Label } from '../../ui/label';
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
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<ReturnFormData>({
    loanId,
    returnDate: new Date().toISOString().split('T')[0],
    condition: 'good',
    notes: ''
  });

  useEffect(() => {
    if (open) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onOpenChange(false), 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    handleClose();
  };

  if (!open) return null;

  return (
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
            Registrar Devolução
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Livro: <strong>{bookTitle}</strong>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-3">
                Condição do Livro
              </Label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="condition"
                    value="good"
                    checked={formData.condition === 'good'}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value as 'good' | 'damaged' | 'lost' })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Boa - Sem danos</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="condition"
                    value="damaged"
                    checked={formData.condition === 'damaged'}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value as 'good' | 'damaged' | 'lost' })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Danificado - Possui danos visíveis</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="condition"
                    value="lost"
                    checked={formData.condition === 'lost'}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value as 'good' | 'damaged' | 'lost' })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Perdido - Livro não foi devolvido</span>
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Observações (opcional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Adicione observações sobre a devolução..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all resize-none"
              />
            </div>

            {formData.condition === 'damaged' && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Livros danificados podem gerar multa de até R$ 50,00
                </p>
              </div>
            )}

            {formData.condition === 'lost' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  ⚠️ Livros perdidos requerem reposição ou pagamento do valor integral
                </p>
              </div>
            )}

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
                className="px-5 py-2.5 text-white rounded-lg transition-all font-medium shadow-sm hover:shadow-md"
                style={{ backgroundColor: "rgb(58, 123, 236)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgb(48, 108, 206)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgb(58, 123, 236)")
                }
              >
                Confirmar Devolução
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}