import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Payment } from '../../../types/reader/payments';
import { 
  DollarSign, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  CreditCard,
  FileText,
  BookOpen,
  X 
} from 'lucide-react';

interface PaymentCardProps {
  payment: Payment;
  onPay?: (paymentId: string) => void;
  onCancel?: (paymentId: string) => void;
}

const statusConfig = {
  pending: {
    label: 'Pendente',
    icon: Clock,
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  paid: {
    label: 'Pago',
    icon: CheckCircle,
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  overdue: {
    label: 'Vencido',
    icon: AlertCircle,
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  cancelled: {
    label: 'Cancelado',
    icon: X,
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  },
};

const typeConfig = {
  fine: {
    label: 'Multa',
    icon: AlertCircle,
    color: 'text-red-600',
  },
  membership: {
    label: 'Mensalidade',
    icon: CreditCard,
    color: 'text-blue-600',
  },
  replacement: {
    label: 'Reposição',
    icon: BookOpen,
    color: 'text-purple-600',
  },
};

const paymentMethodLabels = {
  credit_card: 'Cartão de Crédito',
  debit_card: 'Cartão de Débito',
  pix: 'PIX',
  boleto: 'Boleto',
};

function Clock({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

export function PaymentCard({ payment, onPay, onCancel }: PaymentCardProps) {
  const config = statusConfig[payment.status];
  const typeConf = typeConfig[payment.type];
  const StatusIcon = config.icon;
  const TypeIcon = typeConf.icon;

  const isPending = payment.status === 'pending';
  const isOverdue = payment.status === 'overdue';
  const canPay = isPending || isOverdue;

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${isOverdue ? 'border-red-200' : ''}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className={`p-2 rounded-full bg-muted`}>
              <TypeIcon className={`w-5 h-5 ${typeConf.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  {typeConf.label}
                </Badge>
                <Badge className={config.className}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {config.label}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-1">{payment.description}</h3>
              {payment.relatedTo && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Relacionado: {payment.relatedTo.title}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              R$ {payment.amount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Vencimento:</span>
            <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
              {new Date(payment.dueDate).toLocaleDateString('pt-BR')}
            </span>
            {isOverdue && (
              <Badge variant="destructive" className="text-xs">
                Vencido
              </Badge>
            )}
          </div>

          {payment.paidDate && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-muted-foreground">Pago em:</span>
              <span className="font-medium text-green-600">
                {new Date(payment.paidDate).toLocaleDateString('pt-BR')}
              </span>
            </div>
          )}

          {payment.paymentMethod && (
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Método:</span>
              <span className="font-medium">
                {paymentMethodLabels[payment.paymentMethod]}
              </span>
            </div>
          )}
        </div>

        {isOverdue && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">
                Este pagamento está vencido. Pague o quanto antes para evitar juros adicionais.
              </span>
            </p>
          </div>
        )}

        {canPay && (
          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={() => onPay?.(payment.id)}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Pagar Agora
            </Button>
            {isPending && onCancel && (
              <Button
                variant="outline"
                onClick={() => onCancel?.(payment.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}