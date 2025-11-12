import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { PaymentMethod } from '../../../types/reader/payments';
import { CreditCard, Trash2, Check } from 'lucide-react';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onSetDefault?: (methodId: string) => void;
  onRemove?: (methodId: string) => void;
}

export function PaymentMethodCard({ method, onSetDefault, onRemove }: PaymentMethodCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">
              {method.type === 'credit_card' ? 'Cartão de Crédito' : 'Cartão de Débito'}
            </p>
            <p className="text-sm text-muted-foreground">{method.cardNumber}</p>
          </div>
        </div>
        {method.isDefault && (
          <Badge className="bg-green-100 text-green-800">
            <Check className="w-3 h-3 mr-1" />
            Padrão
          </Badge>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Titular:</span>
          <span className="font-medium">{method.cardHolderName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Validade:</span>
          <span className="font-medium">{method.expiryDate}</span>
        </div>
      </div>

      <div className="flex gap-2">
        {!method.isDefault && onSetDefault && (
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onSetDefault(method.id)}
          >
            Definir como Padrão
          </Button>
        )}
        {onRemove && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onRemove(method.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}