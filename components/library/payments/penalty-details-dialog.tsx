import React from "react";
import {
  AlertCircle,
  CheckCircle,
  Calendar,
  Book,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Alert, AlertDescription } from "../../ui/alert";
import { Avatar } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Penalty } from "../../../types/library/penalties";

interface PenaltyDetailsDialogProps {
  penalty: Penalty | null;
  isOpen: boolean;
  onClose: () => void;
  onPayPenalty: (penaltyId: string) => void;
}

export const PenaltyDetailsDialog: React.FC<PenaltyDetailsDialogProps> = ({
  penalty,
  isOpen,
  onClose,
  onPayPenalty,
}) => {
  if (!penalty) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes da Multa</DialogTitle>
          <DialogDescription>
            Informações completas sobre a multa #{penalty.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Amount */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 mb-2">Status</p>
              <Badge
                className={
                  penalty.paid
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {penalty.paid ? "Paga" : "Pendente"}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-2">Valor</p>
              <p className="text-2xl font-bold">
                R$ {penalty.amount.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Leitor</p>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                    {penalty.readerName.charAt(0)}
                  </Avatar>
                  <p className="font-medium">{penalty.readerName}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Livro</p>
                <p className="flex items-center gap-2">
                  <Book className="w-4 h-4 text-gray-400" />
                  {penalty.bookTitle}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Data de Criação
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {formatDate(penalty.createdAt)}
                </p>
              </div>

              {penalty.dueDate && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Vencimento
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {formatDate(penalty.dueDate)}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Reference IDs */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-3">
              IDs de Referência
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-gray-500">ID da Multa:</span>
                <code className="px-2 py-1 bg-white rounded text-xs">
                  {penalty.id}
                </code>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-gray-500">ID do Empréstimo:</span>
                <code className="px-2 py-1 bg-white rounded text-xs">
                  {penalty.loanId}
                </code>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-gray-500">ID do Leitor:</span>
                <code className="px-2 py-1 bg-white rounded text-xs">
                  {penalty.readerId}
                </code>
              </div>
            </div>
          </div>

          {/* Actions for unpaid penalties */}
          {!penalty.paid && (
            <>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  O leitor pode realizar o pagamento através do link ou você
                  pode marcar como paga manualmente.
                </AlertDescription>
              </Alert>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => window.open(penalty.paymentLink, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir Link de Pagamento
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    onPayPenalty(penalty.id);
                    onClose();
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Marcar como Paga
                </Button>
              </div>
            </>
          )}

          {/* Info for paid penalties */}
          {penalty.paid && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Esta multa já foi paga e está quitada no sistema.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
