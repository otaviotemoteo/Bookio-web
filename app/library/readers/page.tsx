"use client";

import { useState } from "react";
import { Reader, CreateReaderData } from "../../../types/library/reader";
import { mockReaders } from "../../../data/library/mock-create-user";
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
import { Plus, Search, Filter } from "lucide-react";

export default function ReadersPage() {
  const { toast } = useToast();
  const [readers, setReaders] = useState<Reader[]>(mockReaders);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Dialogs state
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Selected reader
  const [selectedReader, setSelectedReader] = useState<Reader | null>(null);
  const [readerToDelete, setReaderToDelete] = useState<string | null>(null);

  // Mock library ID - em produção virá do contexto/auth
  const libraryId = "library-001";

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

  const handleCreateReader = (data: CreateReaderData, picture?: File) => {
    // TODO: Implementar chamada à API
    const newReader: Reader = {
      id: `550e8400-e29b-41d4-a716-${Date.now()}`,
      ...data,
      picture: picture ? URL.createObjectURL(picture) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      activeLoans: 0,
      totalLoans: 0,
      pendingFines: 0,
    };

    setReaders([...readers, newReader]);
    setFormDialogOpen(false);

    toast({
      title: "Leitor cadastrado!",
      description: `${data.name} foi cadastrado com sucesso. Uma senha foi enviada para ${data.email}.`,
    });
  };

  const handleUpdateReader = (data: CreateReaderData, picture?: File) => {
    if (!selectedReader) return;

    // TODO: Implementar chamada à API
    const updatedReaders = readers.map((reader) =>
      reader.id === selectedReader.id
        ? {
            ...reader,
            ...data,
            picture: picture ? URL.createObjectURL(picture) : reader.picture,
            updatedAt: new Date().toISOString(),
          }
        : reader
    );

    setReaders(updatedReaders);
    setFormDialogOpen(false);
    setSelectedReader(null);

    toast({
      title: "Leitor atualizado!",
      description: `As informações de ${data.name} foram atualizadas.`,
    });
  };

  const handleDeleteReader = () => {
    if (!readerToDelete) return;

    // TODO: Implementar chamada à API
    const readerName = readers.find((r) => r.id === readerToDelete)?.name;
    setReaders(readers.filter((reader) => reader.id !== readerToDelete));
    setDeleteDialogOpen(false);
    setReaderToDelete(null);

    toast({
      title: "Leitor excluído",
      description: `${readerName} foi removido do sistema.`,
      variant: "destructive",
    });
  };

  const handleEdit = (reader: Reader) => {
    setSelectedReader(reader);
    setFormDialogOpen(true);
  };

  const handleView = (reader: Reader) => {
    setSelectedReader(reader);
    setDetailDialogOpen(true);
  };

  const handleDelete = (readerId: string) => {
    setReaderToDelete(readerId);
    setDeleteDialogOpen(true);
  };

  const handleNewReader = () => {
    setSelectedReader(null);
    setFormDialogOpen(true);
  };

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
        <Button onClick={handleNewReader}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Leitor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-6">
          <div className="text-2xl font-bold">{readers.length}</div>
          <div className="text-sm text-muted-foreground">Total de Leitores</div>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <div className="text-2xl font-bold">
            {readers.filter((r) => (r.activeLoans || 0) > 0).length}
          </div>
          <div className="text-sm text-muted-foreground">Com Empréstimos</div>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <div className="text-2xl font-bold">
            {readers.filter((r) => (r.pendingFines || 0) > 0).length}
          </div>
          <div className="text-sm text-muted-foreground">Com Multas</div>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <div className="text-2xl font-bold">
            {readers.reduce((sum, r) => sum + (r.totalLoans || 0), 0)}
          </div>
          <div className="text-sm text-muted-foreground">
            Total de Empréstimos
          </div>
        </div>
      </div>

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
      <ReaderTable
        readers={filteredReaders}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* Dialogs */}
      <ReaderFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        onSubmit={selectedReader ? handleUpdateReader : handleCreateReader}
        reader={selectedReader}
        libraryId={libraryId}
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
              Esta ação não pode ser desfeita. O leitor será permanentemente
              removido do sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteReader}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
