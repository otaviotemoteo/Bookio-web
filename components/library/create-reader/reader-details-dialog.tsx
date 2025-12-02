import { Reader } from "../../../types/index";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Mail, MapPin, CreditCard, BookOpen, AlertCircle } from "lucide-react";

interface ReaderDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reader: Reader | null;
}

export function ReaderDetailDialog({
  open,
  onOpenChange,
  reader,
}: ReaderDetailDialogProps) {
  if (!reader) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Leitor</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com Avatar e Info Principal */}
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{reader.name}</h2>
              <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{reader.email}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span className="font-mono">{reader.cpf}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Estatísticas */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold">
                {reader.activeLoans || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Empréstimos Ativos
              </div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold">{reader.totalLoans || 0}</div>
              <div className="text-sm text-muted-foreground">
                Total de Empréstimos
              </div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertCircle
                  className={`h-5 w-5 ${
                    reader.pendingFines && reader.pendingFines > 0
                      ? "text-destructive"
                      : "text-green-500"
                  }`}
                />
              </div>
              <div className="text-2xl font-bold">
                R$ {(reader.pendingFines || 0).toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                Multas Pendentes
              </div>
            </div>
          </div>

          <Separator />

          {/* Endereço */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Endereço
            </h3>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground">CEP:</span>
                  <span className="ml-2 font-mono">{reader.address.cep}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Cidade:</span>
                  <span className="ml-2">{reader.address.city}</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Rua:</span>
                <span className="ml-2">
                  {reader.address.street}, {reader.address.number}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Bairro:</span>
                <span className="ml-2">{reader.address.neighborhood}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Informações Adicionais */}
          <div className="text-sm text-muted-foreground space-y-1">
            <div>
              <span className="font-medium">Cadastrado em:</span>{" "}
              {formatDate(reader.createdAt)}
            </div>
            {reader.updatedAt && (
              <div>
                <span className="font-medium">Última atualização:</span>{" "}
                {formatDate(reader.updatedAt)}
              </div>
            )}
          </div>

          {/* Status Badge */}
          <div className="flex gap-2">
            {reader.pendingFines && reader.pendingFines > 0 && (
              <Badge variant="destructive">Com Multas Pendentes</Badge>
            )}
            {reader.activeLoans && reader.activeLoans > 0 && (
              <Badge variant="default">Com Empréstimos Ativos</Badge>
            )}
            {(!reader.activeLoans || reader.activeLoans === 0) &&
              (!reader.pendingFines || reader.pendingFines === 0) && (
                <Badge variant="outline">Em Dia</Badge>
              )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
