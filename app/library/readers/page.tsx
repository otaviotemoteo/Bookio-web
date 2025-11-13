// page.tsx

"use client";

import { useState, useEffect } from "react";
import { Reader, CreateReaderRequest } from "../../../types/index";
import { useReader } from "../../../hooks/use-reader";
import { useAuth } from "../../../hooks/use-auth";
import { ReaderTable } from "../../../components/library/create-reader/reader-table";
import { ReaderFormDialog } from "../../../components/library/create-reader/reader-form-dialog";
import { ReaderDetailDialog } from "../../../components/library/create-reader/reader-details-dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { useToast } from "../../../components/ui/use-toast";
import { Plus, Search, Filter, Loader2 } from "lucide-react";
import { ReadersStats } from "../../../components/library/create-reader/readers-stats";

export default function ReadersPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { listReaders, createReader, updateReader, deleteReader } = useReader();

  const [readers, setReaders] = useState<Reader[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Dialogs state
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Selected reader
  const [selectedReader, setSelectedReader] = useState<Reader | null>(null);
  const [readerToDelete, setReaderToDelete] = useState<Reader | null>(null);

  // Usar user.id como libraryId
  const libraryId = user?.id || "";

  // Carregar leitores ao montar o componente
  useEffect(() => {
    if (libraryId) {
      loadReaders();
    }
  }, [libraryId]);

  const loadReaders = async () => {
    try {
      setLoading(true);
      const result = await listReaders(libraryId);

      if (result.success && result.data) {
        setReaders(result.data);
      } else {
        toast({
          title: "Erro ao carregar leitores",
          description: result.error || "Erro desconhecido",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao carregar leitores",
        description: error.message || "Erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filtrar leitores
  const filteredReaders = readers.filter((reader) => {
    const matchesSearch =
      reader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reader.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reader.cpf.includes(searchQuery);

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && (reader.activeLoans || 0) > 0) ||
      (filterStatus === "fines" && (reader.pendingFines || 0) > 0) ||
      (filterStatus === "clear" &&
        (!reader.activeLoans || reader.activeLoans === 0) &&
        (!reader.pendingFines || reader.pendingFines === 0));

    return matchesSearch && matchesFilter;
  });

  const handleCreateReader = async (
    data: CreateReaderRequest,
    picture?: File
  ) => {
    try {
      setActionLoading(true);
      const result = await createReader(data, picture);

      if (result.success) {
        // Recarregar a lista de leitores
        await loadReaders();

        setFormDialogOpen(false);

        toast({
          title: "Leitor cadastrado!",
          description: `${data.name} foi cadastrado com sucesso. Uma senha foi enviada para ${data.email}.`,
        });
      } else {
        toast({
          title: "Erro ao cadastrar leitor",
          description: result.error || "Erro desconhecido",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar leitor",
        description: error.message || "Erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateReader = async (
    data: CreateReaderRequest,
    picture?: File
  ) => {
    if (!selectedReader) return;

    try {
      setActionLoading(true);

      // Converter CreateReaderRequest para UpdateReaderRequest
      const updateData = {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        address: data.address,
      };

      const result = await updateReader(selectedReader.id, updateData, picture);

      if (result.success) {
        // Recarregar a lista de leitores
        await loadReaders();

        setFormDialogOpen(false);
        setSelectedReader(null);

        toast({
          title: "Leitor atualizado!",
          description: `As informações de ${data.name} foram atualizadas.`,
        });
      } else {
        toast({
          title: "Erro ao atualizar leitor",
          description: result.error || "Erro desconhecido",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar leitor",
        description: error.message || "Erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteReader = async () => {
    if (!readerToDelete) return;

    try {
      setActionLoading(true);

      // Usa o ID do reader diretamente (que é o userId)
      const result = await deleteReader(readerToDelete.id);

      if (result.success) {
        // Recarregar a lista de leitores
        await loadReaders();

        setDeleteDialogOpen(false);

        toast({
          title: "Leitor excluído",
          description: `${readerToDelete.name} foi removido do sistema.`,
          variant: "destructive",
        });

        setReaderToDelete(null);
      } else {
        toast({
          title: "Erro ao excluir leitor",
          description: result.error || "Erro desconhecido",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao excluir leitor",
        description: error.message || "Erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (reader: Reader) => {
    setSelectedReader(reader);
    setFormDialogOpen(true);
  };

  const handleView = (reader: Reader) => {
    setSelectedReader(reader);
    setDetailDialogOpen(true);
  };

  const handleDelete = (reader: Reader) => {
    setReaderToDelete(reader);
    setDeleteDialogOpen(true);
  };

  const handleNewReader = () => {
    setSelectedReader(null);
    setFormDialogOpen(true);
  };

  // Calcular estatísticas
  const stats = {
    activeReservations: readers.filter((r) => (r.activeLoans || 0) > 0).length,
    readyForPickup: 0, // TODO: Implementar quando tiver dados de reservas
    waitingList: 0, // TODO: Implementar quando tiver dados de fila
    totalReservations: readers.reduce((acc, r) => acc + (r.totalLoans || 0), 0),
  };

  // Verificar se o user está carregando ou se não é uma biblioteca
  if (!user || user.role !== "LIBRARY") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando leitores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leitores</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os leitores cadastrados na biblioteca
          </p>
        </div>
        <Button onClick={handleNewReader} disabled={actionLoading}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Leitor
        </Button>
      </div>

      {/* Stats */}
      <ReadersStats
        activeReservations={stats.activeReservations}
        readyForPickup={stats.readyForPickup}
        waitingList={stats.waitingList}
        totalReservations={stats.totalReservations}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou CPF..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Com Empréstimos</SelectItem>
            <SelectItem value="fines">Com Multas</SelectItem>
            <SelectItem value="clear">Em Dia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {filteredReaders.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground">
            {searchQuery || filterStatus !== "all"
              ? "Nenhum leitor encontrado com os filtros aplicados."
              : "Nenhum leitor cadastrado ainda."}
          </p>
        </div>
      ) : (
        <ReaderTable
          readers={filteredReaders}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}

      {/* Dialogs */}
      <ReaderFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        onSubmit={selectedReader ? handleUpdateReader : handleCreateReader}
        reader={selectedReader}
        libraryId={libraryId}
        loading={actionLoading}
      />

      <ReaderDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        reader={selectedReader}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O leitor {readerToDelete?.name}{" "}
              será permanentemente removido do sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteReader}
              disabled={actionLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
