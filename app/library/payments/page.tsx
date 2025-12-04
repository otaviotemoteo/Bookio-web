"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Plus,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useToast } from "../../../components/ui/use-toast";
import { useAuth } from "../../../hooks/use-auth";
import { useLibrary } from "../../../hooks/use-library";
import { useReader } from "../../../hooks/use-reader";
import { usePenalty } from "../../../hooks/use-penalty";
import { StatsCard } from "../../../components/library/payments/stats-card";
import { PenaltyTable } from "../../../components/library/payments/penalty-table";
import { PenaltyDetailsDialog } from "../../../components/library/payments/penalty-details-dialog";
import { CreatePenaltyDialog } from "../../../components/library/payments/create-penalty-dialog";
import { PenaltyWithReader } from "../../../types/penalty";

interface Reader {
  id: string;
  name: string;
  email: string;
}

export default function PaymentsPage() {
  const { user } = useAuth();
  const libraryId = user?.id || "";
  const { toast } = useToast();
  
  const { getLibraryReaders, getLibraryPenalties } = useLibrary();
  const { getReaderPenalties } = useReader();
  const { payPenalty } = usePenalty();

  const [readers, setReaders] = useState<Reader[]>([]);
  const [selectedReaderId, setSelectedReaderId] = useState<string>("all");
  const [allPenalties, setAllPenalties] = useState<PenaltyWithReader[]>([]);
  const [displayedPenalties, setDisplayedPenalties] = useState<PenaltyWithReader[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedPenalty, setSelectedPenalty] = useState<PenaltyWithReader | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Carregar dados iniciais (readers e todas as penalties)
  useEffect(() => {
    const loadInitialData = async () => {
      if (!libraryId) return;

      setIsLoading(true);
      try {
        // Buscar readers
        const readersResult = await getLibraryReaders(libraryId);
        const readersData = readersResult?.data || [];
        setReaders(readersData);

        // Buscar todas as penalties da biblioteca
        const penaltiesResult = await getLibraryPenalties(libraryId);
        const penaltiesData = penaltiesResult?.data || [];

        // Mapear penalties com nome do reader
        const penaltiesWithReader: PenaltyWithReader[] = penaltiesData.map(
          (penalty) => {
            const reader = readersData.find((r: Reader) => r.id === penalty.readerId);
            return {
              ...penalty,
              readerName: reader?.name || "Leitor desconhecido",
            };
          }
        );

        setAllPenalties(penaltiesWithReader);
        setDisplayedPenalties(penaltiesWithReader);

        console.log("✅ Dados carregados:", {
          readers: readersData.length,
          penalties: penaltiesData.length,
        });
      } catch (error) {
        console.error("❌ Erro ao carregar dados:", error);
        toast({
          title: "Erro",
          description: "Erro ao carregar dados",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [libraryId]);

  // Filtrar penalties quando o reader for alterado
  useEffect(() => {
    if (selectedReaderId === "all") {
      setDisplayedPenalties(allPenalties);
    } else {
      const filtered = allPenalties.filter(
        (p) => p.readerId === selectedReaderId
      );
      setDisplayedPenalties(filtered);
    }
  }, [selectedReaderId, allPenalties]);

  // Calcular estatísticas
  const stats = {
    total: displayedPenalties.length,
    paid: displayedPenalties.filter((p) => p.paid).length,
    pending: displayedPenalties.filter((p) => !p.paid).length,
    totalAmount: displayedPenalties.reduce((sum, p) => sum + p.amount, 0),
    paidAmount: displayedPenalties
      .filter((p) => p.paid)
      .reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: displayedPenalties
      .filter((p) => !p.paid)
      .reduce((sum, p) => sum + p.amount, 0),
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2)}`;
  };

  const handleReaderSelect = (readerId: string) => {
    setSelectedReaderId(readerId);
  };

  const handlePayPenalty = async (penaltyId: string) => {
    const result = await payPenalty(penaltyId);

    if (result.success) {
      toast({
        title: "Sucesso",
        description: "Multa marcada como paga!",
      });

      // Atualizar a lista localmente
      setAllPenalties(
        allPenalties.map((p) => (p.id === penaltyId ? { ...p, paid: true } : p))
      );
    } else {
      toast({
        title: "Erro",
        description: result.error || "Erro ao pagar multa",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (penalty: PenaltyWithReader) => {
    setSelectedPenalty(penalty);
    setIsDetailsDialogOpen(true);
  };

  const handleCloseDetailsDialog = () => {
    setIsDetailsDialogOpen(false);
    setSelectedPenalty(null);
  };

  const handlePenaltyCreated = async () => {
    // Recarregar todas as penalties
    if (!libraryId) return;

    try {
      const penaltiesResult = await getLibraryPenalties(libraryId);
      const penaltiesData = penaltiesResult?.data || [];

      const penaltiesWithReader: PenaltyWithReader[] = penaltiesData.map(
        (penalty) => {
          const reader = readers.find((r) => r.id === penalty.readerId);
          return {
            ...penalty,
            readerName: reader?.name || "Leitor desconhecido",
          };
        }
      );

      setAllPenalties(penaltiesWithReader);

      toast({
        title: "Sucesso",
        description: "Multa criada com sucesso!",
      });
    } catch (error) {
      console.error("❌ Erro ao recarregar multas:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestão de Multas
            </h1>
            <p className="text-gray-600 mt-2">
              Controle completo de multas e pagamentos da biblioteca
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Multa
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total de Multas"
            value={stats.total}
            subtitle={`${stats.paid} pagas • ${stats.pending} pendentes`}
            icon={DollarSign}
          />
          <StatsCard
            title="Valor Total"
            value={formatCurrency(stats.totalAmount)}
            subtitle="Todas as multas"
            icon={TrendingUp}
          />
          <StatsCard
            title="Multas Pagas"
            value={formatCurrency(stats.paidAmount)}
            subtitle={`${stats.paid} multas`}
            icon={CheckCircle}
            trend="down"
          />
          <StatsCard
            title="Pendentes"
            value={formatCurrency(stats.pendingAmount)}
            subtitle={`${stats.pending} multas`}
            icon={AlertCircle}
            trend="up"
          />
        </div>

        {/* Reader Filter */}
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Filtrar por leitor</h2>
            <Select
              value={selectedReaderId}
              onValueChange={handleReaderSelect}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um leitor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os leitores</SelectItem>
                {readers.map((reader) => (
                  <SelectItem key={reader.id} value={reader.id}>
                    {reader.name} ({reader.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Content Area */}
        {isLoading ? (
          <Card className="p-12">
            <div className="text-center text-gray-500">
              Carregando multas...
            </div>
          </Card>
        ) : displayedPenalties.length === 0 ? (
          <Card className="p-12">
            <div className="text-center text-gray-500">
              {selectedReaderId === "all"
                ? "Nenhuma multa cadastrada na biblioteca"
                : "Este leitor não possui multas"}
            </div>
          </Card>
        ) : (
          <PenaltyTable
            penalties={displayedPenalties}
            onViewDetails={handleViewDetails}
          />
        )}
      </div>

      {/* Dialogs */}
      <PenaltyDetailsDialog
        penalty={selectedPenalty}
        isOpen={isDetailsDialogOpen}
        onClose={handleCloseDetailsDialog}
        onPayPenalty={handlePayPenalty}
      />

      <CreatePenaltyDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handlePenaltyCreated}
        readers={readers}
      />
    </div>
  );
}