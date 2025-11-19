import React from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Filter, Search, X } from "lucide-react";
import { SchedulingStatus } from "../../../types/index";

interface SchedulingFilters {
  searchTerm?: string;
  status?: SchedulingStatus | "all";
}

interface SchedulingFiltersProps {
  filters: SchedulingFilters;
  onFiltersChange: (filters: SchedulingFilters) => void;
  onClearFilters: () => void;
}

const SchedulingFiltersComponent: React.FC<SchedulingFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const hasActiveFilters = filters.searchTerm || filters.status !== "all";

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Buscar por livro..."
          value={filters.searchTerm || ""}
          onChange={(e) =>
            onFiltersChange({ ...filters, searchTerm: e.target.value })
          }
          className="pl-10"
        />
      </div>

      <Select
        value={filters.status || "all"}
        onValueChange={(value) =>
          onFiltersChange({
            ...filters,
            status: value as SchedulingStatus | "all",
          })
        }
      >
        <SelectTrigger className="w-full md:w-[200px]">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Filtrar por status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          <SelectItem value="PENDING">Pendentes</SelectItem>
          <SelectItem value="COMPLETED">Concluídos</SelectItem>
          <SelectItem value="CANCELLED">Cancelados</SelectItem>
          <SelectItem value="EXPIRED">Expirados</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full md:w-auto"
        >
          <X className="w-4 h-4 mr-2" />
          Limpar Filtros
        </Button>
      )}
    </div>
  );
};

export default SchedulingFiltersComponent;
