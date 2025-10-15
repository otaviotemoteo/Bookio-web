import React from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Avatar } from "../../ui/avatar";
import { Penalty } from "../../../types/library/penalties";

interface PenaltyTableProps {
  penalties: Penalty[];
  onViewDetails: (penalty: Penalty) => void;
}

export const PenaltyTable: React.FC<PenaltyTableProps> = ({
  penalties,
  onViewDetails,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leitor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Livro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {penalties.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Nenhuma multa encontrada
                </td>
              </tr>
            ) : (
              penalties.map((penalty) => (
                <tr key={penalty.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                        {penalty.readerName.charAt(0)}
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {penalty.readerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {penalty.readerId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">
                      {penalty.bookTitle}
                    </p>
                    <p className="text-xs text-gray-500">{penalty.loanId}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-semibold text-gray-900">
                      R$ {penalty.amount.toFixed(2)}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      className={
                        penalty.paid
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {penalty.paid ? "Paga" : "Pendente"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">
                      {formatDate(penalty.createdAt)}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(penalty)}
                    >
                      Ver Detalhes
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
