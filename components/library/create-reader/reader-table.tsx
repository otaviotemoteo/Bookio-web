import { Reader } from "../../../types/library/reader";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Pencil, Trash2, Eye } from "lucide-react";

interface ReaderTableProps {
  readers: Reader[];
  onEdit: (reader: Reader) => void;
  onDelete: (reader: Reader) => void;
  onView: (reader: Reader) => void;
}

export function ReaderTable({
  readers,
  onEdit,
  onDelete,
  onView,
}: ReaderTableProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Leitor</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead className="text-center">Empréstimos Ativos</TableHead>
            <TableHead className="text-center">Multas</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {readers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground py-8"
              >
                Nenhum leitor cadastrado
              </TableCell>
            </TableRow>
          ) : (
            readers.map((reader) => (
              <TableRow key={reader.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={reader.picture} alt={reader.name} />
                      <AvatarFallback>
                        {getInitials(reader.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{reader.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {reader.totalLoans || 0} empréstimos totais
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {reader.cpf}
                </TableCell>
                <TableCell>{reader.email}</TableCell>
                <TableCell>{reader.address.city}</TableCell>
                <TableCell className="text-center">
                  {reader.activeLoans ? (
                    <Badge
                      variant={reader.activeLoans > 0 ? "default" : "secondary"}
                    >
                      {reader.activeLoans}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">0</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {reader.pendingFines && reader.pendingFines > 0 ? (
                    <Badge variant="destructive">
                      R$ {reader.pendingFines.toFixed(2)}
                    </Badge>
                  ) : (
                    <Badge variant="outline">R$ 0,00</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="gray"
                      size="icon"
                      onClick={() => onView(reader)}
                      title="Ver detalhes"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="blue"
                      size="icon"
                      onClick={() => onEdit(reader)}
                      title="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="red"
                      size="icon"
                      onClick={() => onDelete(reader)}
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}