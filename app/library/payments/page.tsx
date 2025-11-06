"use client";

import React, { useState } from "react";
import { DollarSign, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Penalty } from "../../../types/library/penalties";
import { mockPenalties } from "../../../data/library/mock-penalties";
import { StatsCard } from "../../../components/library/payments/stats-card";
import { PenaltyTable } from "../../../components/library/payments/penalty-table";
import { PenaltyFilters } from "../../../components/library/payments/penalty-filters";
import { PenaltyDetailsDialog } from "../../../components/library/payments/penalty-details-dialog";
import {
  calculatePenaltyStats,
  filterPenalties,
  formatCurrency,
} from "../../../lib/services/penalty";

export default function PaymentsPage() {
  const [penalties, setPenalties] = useState<Penalty[]>(mockPenalties);
  const [selectedPenalty, setSelectedPenalty] = useState<Penalty | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = calculatePenaltyStats(penalties);
  const filteredPenalties = filterPenalties(
    penalties,
    searchTerm,
    statusFilter
  );

  const handlePayPenalty = (penaltyId: string) => {
    setPenalties(
      penalties.map((p) => (p.id === penaltyId ? { ...p, paid: true } : p))
    );
  };

  const handleViewDetails = (penalty: Penalty) => {
    setSelectedPenalty(penalty);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPenalty(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Multas</h1>
          <p className="text-gray-600 mt-2">
            Controle completo de multas e pagamentos da biblioteca
          </p>
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

        {/* Filters */}
        <PenaltyFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
        />

        {/* Table */}
        <PenaltyTable
          penalties={filteredPenalties}
          onViewDetails={handleViewDetails}
        />
      </div>

      {/* Details Dialog */}
      <PenaltyDetailsDialog
        penalty={selectedPenalty}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onPayPenalty={handlePayPenalty}
      />
    </div>
  );
}
