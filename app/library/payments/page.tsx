"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Plus,
} from "lucide-react";
import { Alert, AlertDescription } from "../../../components/ui/alert";
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
import { usePenalty } from "../../../hooks/use-penalty";
import { StatsCard } from "../../../components/library/payments/stats-card";
import { PenaltyTable } from "../../../components/library/payments/penalty-table";
import { PenaltyDetailsDialog } from "../../../components/library/payments/penalty-details-dialog";
import { CreatePenaltyDialog } from "../../../components/library/payments/create-penalty-dialog";
import { Penalty } from "../../../types/penalty";

interface Reader {
  id: string;
  name: string;
  email: string;
}

interface PenaltyWithReader extends Penalty {
  readerName: string;
  readerId: string;
}

export default function PaymentsPage() {
  const { user } = useAuth();
  const libraryId = user?.id || "";
  const { toast } = useToast();
  const { payPenalty } = usePenalty();

  const [readers, setReaders] = useState<Reader[]>([]);
  const [selectedReaderId, setSelectedReaderId] = useState<string>("");
  const [selectedReaderName, setSelectedReaderName] = useState<string>("");
  const [penalties, setPenalties] = useState<PenaltyWithReader[]>([]);
  const [isLoadingReaders, setIsLoadingReaders] = useState(false);
  const [isLoadingPenalties, setIsLoadingPenalties] = useState(false);

  const [selectedPenalty, setSelectedPenalty] =
    useState<PenaltyWithReader | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Carregar readers
  useEffect(() => {
    const loadReaders = async () => {
      if (!libraryId) return;

      setIsLoadingReaders(true);
      try {
        console.log("📤 Carregando readers da biblioteca:", libraryId);
        const response = await fetch(`/api/library/${libraryId}/readers`);

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Readers carregados:", data);
          setReaders(data.readers || []);
        } else {
          console.error("❌ Erro ao buscar readers");
          toast({
            title: "Erro",
            description: "Erro ao carregar leitores",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("❌ Erro ao carregar readers:", error);
        toast({
          title: "Erro",
          description: "Erro ao carregar leitores",
          variant: "destructive",
        });
      } finally {
        setIsLoadingReaders(false);
      }
    };

    loadReaders();
  }, [libraryId, toast]);

  // Carregar multas do reader selecionado
  useEffect(() => {
    const loadPenalties = async () => {
      if (!selectedReaderId) {
        setPenalties([]);
        return;
      }

      setIsLoadingPenalties(true);
      try {
        console.log("📤 Carregando multas do reader:", selectedReaderId);
        const response = await fetch(
          `/api/reader/${selectedReaderId}/penalties`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Multas carregadas:", data);

          // Adicionar readerName e readerId às penalties
          const penaltiesWithReader: PenaltyWithReader[] = (
            data.penalities || []
          ).map((p: any) => ({
            ...p,
            readerName: selectedReaderName,
            readerId: selectedReaderId,
          }));

          setPenalties(penaltiesWithReader);
        } else {
          console.error("❌ Erro ao buscar multas");
          toast({
            title: "Erro",
            description: "Erro ao carregar multas do leitor",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("❌ Erro ao carregar multas:", error);
        toast({
          title: "Erro",
          description: "Erro ao carregar multas do leitor",
          variant: "destructive",
        });
      } finally {
        setIsLoadingPenalties(false);
      }
    };

    loadPenalties();
  }, [selectedReaderId, selectedReaderName, toast]);

  // Calcular estatísticas
  const stats = {
    total: penalties.length,
    paid: penalties.filter((p) => p.paid).length,
    pending: penalties.filter((p) => !p.paid).length,
    totalAmount: penalties.reduce((sum, p) => sum + p.amount, 0),
    paidAmount: penalties
      .filter((p) => p.paid)
      .reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: penalties
      .filter((p) => !p.paid)
      .reduce((sum, p) => sum + p.amount, 0),
  };

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2)}`;
  };

  const handleReaderSelect = (readerId: string) => {
    setSelectedReaderId(readerId);
    const reader = readers.find((r) => r.id === readerId);
    setSelectedReaderName(reader?.name || "");
  };

  const handlePayPenalty = async (penaltyId: string) => {
    const result = await payPenalty(penaltyId);

    if (result.success) {
      toast({
        title: "Sucesso",
        description: "Multa marcada como paga!",
      });

      // Atualizar a lista localmente
      setPenalties(
        penalties.map((p) => (p.id === penaltyId ? { ...p, paid: true } : p))
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

  const handlePenaltyCreated = () => {
    // Recarregar as multas do reader selecionado
    if (selectedReaderId) {
      const reloadPenalties = async () => {
        const response = await fetch(
          `/api/reader/${selectedReaderId}/penalties`
        );
        if (response.ok) {
          const data = await response.json();
          const penaltiesWithReader: PenaltyWithReader[] = (
            data.penalities || []
          ).map((p: any) => ({
            ...p,
            readerName: selectedReaderName,
            readerId: selectedReaderId,
          }));
          setPenalties(penaltiesWithReader);
        }
      };
      reloadPenalties();
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
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

        {/* Reader Selection */}
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Selecione um leitor</h2>
            <Select
              value={selectedReaderId}
              onValueChange={handleReaderSelect}
              disabled={isLoadingReaders}
            >
              <SelectTrigger>
                <SelectValue placeholder="Escolha um leitor para ver suas multas" />
              </SelectTrigger>
              <SelectContent>
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
        {!selectedReaderId ? (
          <Card className="p-12">
            <div className="text-center text-gray-500">
              Selecione um leitor acima para visualizar suas multas
            </div>
          </Card>
        ) : isLoadingPenalties ? (
          <Card className="p-12">
            <div className="text-center text-gray-500">
              Carregando multas...
            </div>
          </Card>
        ) : (
          <PenaltyTable
            penalties={penalties}
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
