import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { BookOpen, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface LoansStatsProps {
  activeLoans: number;
  overdueLoans: number;
  returnedToday: number;
  totalFines: number;
}

export function LoansStats({
  activeLoans,
  overdueLoans,
  returnedToday,
  totalFines
}: LoansStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Empréstimos Ativos
          </CardTitle>
          <BookOpen className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeLoans}</div>
          <p className="text-xs text-gray-500 mt-1">
            Livros em circulação
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Em Atraso
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{overdueLoans}</div>
          <p className="text-xs text-gray-500 mt-1">
            Requerem atenção
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Devolvidos Hoje
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{returnedToday}</div>
          <p className="text-xs text-gray-500 mt-1">
            Devoluções registradas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Multas Pendentes
          </CardTitle>
          <Clock className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            R$ {totalFines.toFixed(2)}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Total a receber
          </p>
        </CardContent>
      </Card>
    </div>
  );
}