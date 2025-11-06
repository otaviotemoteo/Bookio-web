"use client";

import { useState, useEffect } from "react";
import { Reader, CreateReaderData } from "../../../types/library/reader";
import { ReadersService } from "../../../lib/services/reader";
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

  // TODO: Pegar o libraryId do contexto de autenticação ou session
  // Por enquanto usando um mock, mas você deve substituir isso
  const libraryId = "library-001"; // ⚠️ SUBSTITUIR COM O ID REAL DA BIBLIOTECA LOGADA

  // Carregar leitores ao montar o componente
  useEffect(() => {
    loadReaders();
  }, []);

  const loadReaders = async () => {
    try {
      setLoading(true);
      const data = await ReadersService.listReaders(libraryId);
      setReaders(data);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar leitores",
        description: error.message,
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

  const handleCreateReader = async (data: CreateReaderData, picture?: File) => {
    try {
      setActionLoading(true);
      const newReader = await ReadersService.createReader(data, picture);

      setReaders([...readers, newReader]);
      setFormDialogOpen(false);

      toast({
        title: "Leitor cadastrado!",
        description: `${data.name} foi cadastrado com sucesso. Uma senha foi enviada para ${data.email}.`,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar leitor",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateReader = async (data: CreateReaderData, picture?: File) => {
    if (!selectedReader) return;

    try {
      setActionLoading(true);
      const updatedReader = await ReadersService.updateReader(
        selectedReader.id,
        data,
        picture
      );

      const updatedReaders = readers.map((reader) =>
        reader.id === selectedReader.id ? updatedReader : reader
      );

      setReaders(updatedReaders);
      setFormDialogOpen(false);
      setSelectedReader(null);

      toast({
        title: "Leitor atualizado!",
        description: `As informações de ${data.name} foram atualizadas.`,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar leitor",
        description: error.message,
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
      await ReadersService.deleteReader(readerToDelete.userId);

      setReaders(readers.filter((reader) => reader.id !== readerToDelete.id));
      setDeleteDialogOpen(false);

      toast({
        title: "Leitor excluído",
        description: `${readerToDelete.name} foi removido do sistema.`,
        variant: "destructive",
      });

      setReaderToDelete(null);
    } catch (error: any) {
      toast({
        title: "Erro ao excluir leitor",
        description: error.message,
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

      <ReadersStats
        activeReservations={2}
        readyForPickup={2}
        waitingList={3}
        totalReservations={7}
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
