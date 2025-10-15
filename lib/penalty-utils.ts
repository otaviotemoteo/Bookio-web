import { Penalty, PenaltyStats } from "../types/library/penalties";

export const calculatePenaltyStats = (penalties: Penalty[]): PenaltyStats => {
  const total = penalties.length;
  const paid = penalties.filter((p) => p.paid).length;
  const pending = total - paid;

  const totalAmount = penalties.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = penalties
    .filter((p) => p.paid)
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  return {
    total,
    paid,
    pending,
    totalAmount,
    paidAmount,
    pendingAmount,
  };
};

export const filterPenalties = (
  penalties: Penalty[],
  searchTerm: string,
  statusFilter: string
): Penalty[] => {
  return penalties.filter((penalty) => {
    const matchesSearch =
      penalty.readerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      penalty.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      penalty.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "paid" && penalty.paid) ||
      (statusFilter === "pending" && !penalty.paid);

    return matchesSearch && matchesStatus;
  });
};

export const formatCurrency = (value: number): string => {
  return `R$ ${value.toFixed(2)}`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("pt-BR");
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
