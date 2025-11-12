'use client';

import { useState, useMemo } from 'react';
import { PaymentCard } from '../../../components/reader/payments/payment-card';
import { PaymentFilters } from '../../../components/reader/payments/payment-filter';
import { PaymentMethodCard } from '../../../components/reader/payments/payment-method';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { PaymentFilters as PaymentFiltersType } from '../../../types/reader/payments';
import { DollarSign, AlertCircle, CheckCircle, CreditCard, Plus } from 'lucide-react';
import { mockPayments, mockPaymentStats, mockPaymentMethods } from '../../../data/reader/mock-payments';

export default function PaymentsPage() {
  const [filters, setFilters] = useState<PaymentFiltersType>({
    status: 'all',
    type: 'all',
    search: '',
    sortBy: 'dueDate',
    sortOrder: 'asc',
  });

  // Filter and sort payments
  const filteredPayments = useMemo(() => {
    let result = [...mockPayments];

    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(payment => payment.status === filters.status);
    }

    // Filter by type
    if (filters.type !== 'all') {
      result = result.filter(payment => payment.type === filters.type);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        payment =>
          payment.description.toLowerCase().includes(searchLower) ||
          payment.relatedTo?.title.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    result.sort((a, b) => {
      let compareValue = 0;

      switch (filters.sortBy) {
        case 'dueDate':
          compareValue = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'amount':
          compareValue = a.amount - b.amount;
          break;
        case 'paidDate':
          if (a.paidDate && b.paidDate) {
            compareValue = new Date(a.paidDate).getTime() - new Date(b.paidDate).getTime();
          }
          break;
      }

      return filters.sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return result;
  }, [filters]);

  const handlePay = (paymentId: string) => {
    console.log('Pagando:', paymentId);
    // Implementar modal de pagamento
  };

  const handleCancel = (paymentId: string) => {
    console.log('Cancelando pagamento:', paymentId);
    // Implementar lógica de cancelamento
  };

  const handleSetDefaultMethod = (methodId: string) => {
    console.log('Definindo método padrão:', methodId);
    // Implementar lógica de definir padrão
  };

  const handleRemoveMethod = (methodId: string) => {
    console.log('Removendo método:', methodId);
    // Implementar lógica de remoção
  };

  const handleAddPaymentMethod = () => {
    console.log('Adicionando método de pagamento');
    // Implementar modal de adicionar método
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pagamentos</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie seus pagamentos e métodos de pagamento
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-yellow-100">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Pendente</p>
              <p className="text-2xl font-bold">R$ {mockPaymentStats.pendingAmount.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{mockPaymentStats.totalPending} pagamento(s)</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-red-100">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Vencido</p>
              <p className="text-2xl font-bold text-red-600">R$ {mockPaymentStats.overdueAmount.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{mockPaymentStats.totalOverdue} pagamento(s)</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Pago</p>
              <p className="text-2xl font-bold text-green-600">R$ {mockPaymentStats.paidAmount.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{mockPaymentStats.totalPaid} pagamento(s)</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Overdue Alert */}
      {mockPaymentStats.totalOverdue > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Você tem {mockPaymentStats.totalOverdue} pagamento(s) vencido(s) no valor total de R$ {mockPaymentStats.overdueAmount.toFixed(2)}.
            Por favor, regularize sua situação o quanto antes para evitar juros adicionais.
          </AlertDescription>
        </Alert>
      )}

      {/* Payment Methods */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Métodos de Pagamento</h2>
            <p className="text-sm text-muted-foreground">Gerencie seus cartões cadastrados</p>
          </div>
          <Button onClick={handleAddPaymentMethod}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Método
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPaymentMethods.map(method => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              onSetDefault={handleSetDefaultMethod}
              onRemove={handleRemoveMethod}
            />
          ))}
        </div>
      </Card>

      {/* Filters */}
      <PaymentFilters filters={filters} onFilterChange={setFilters} />

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.length === 0 ? (
          <Card className="p-12 text-center">
            <DollarSign className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum pagamento encontrado</h3>
            <p className="text-muted-foreground">
              {filters.search || filters.status !== 'all' || filters.type !== 'all'
                ? 'Tente ajustar os filtros para encontrar o que procura.'
                : 'Você não tem nenhum pagamento registrado no momento.'}
            </p>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Exibindo {filteredPayments.length} de {mockPayments.length} pagamento(s)
              </p>
            </div>
            {filteredPayments.map(payment => (
              <PaymentCard
                key={payment.id}
                payment={payment}
                onPay={handlePay}
                onCancel={handleCancel}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}