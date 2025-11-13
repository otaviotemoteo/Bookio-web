"use client";

import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Filter, Search } from "lucide-react";
import { LoanStatus } from "../../../types/index";

interface LoansFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: LoanStatus | "all";
  onStatusFilterChange: (value: LoanStatus | "all") => void;
}

export function LoansFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: LoansFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar por ID do livro, leitor ou empréstimo..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Filtrar por status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os Status</SelectItem>
          <SelectItem value="ACTIVE">Ativos</SelectItem>
          <SelectItem value="OVERDUE">Em Atraso</SelectItem>
          <SelectItem value="RETURNED">Devolvidos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
