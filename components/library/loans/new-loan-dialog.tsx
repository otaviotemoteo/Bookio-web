'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Plus } from 'lucide-react';
import { LoanFormData } from '../../../types/library/loans';

interface NewLoanDialogProps {
  onSubmit: (data: LoanFormData) => void;
}

export function NewLoanDialog({ onSubmit }: NewLoanDialogProps) {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<LoanFormData>({
    userId: '',
    bookId: '',
    loanDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
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
    setTimeout(() => setOpen(false), 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    handleClose();
    setFormData({
      userId: '',
      bookId: '',
      loanDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                    ID do Usuário
                  </Label>
                  <Input
                    id="userId"
                    placeholder="Digite o ID do usuário"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <Label htmlFor="bookId" className="block text-sm font-medium text-gray-700 mb-2">
                    ID do Livro
                  </Label>
                  <Input
                    id="bookId"
                    placeholder="Digite o ID do livro"
                    value={formData.bookId}
                    onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="loanDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Empréstimo
                    </Label>
                    <Input
                      id="loanDate"
                      type="date"
                      value={formData.loanDate}
                      onChange={(e) => setFormData({ ...formData, loanDate: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Data de Devolução
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all"
                    />
                  </div>
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
                    className="px-5 py-2.5 text-white rounded-lg transition-all font-medium shadow-sm hover:shadow-md"
                    style={{ backgroundColor: "rgb(58, 123, 236)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "rgb(48, 108, 206)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "rgb(58, 123, 236)")
                    }
                  >
                    Registrar Empréstimo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}