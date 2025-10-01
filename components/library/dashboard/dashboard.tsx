import React from "react";
import {
  FaBook,
  FaUsers,
  FaClipboardList,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const Dashboard: React.FC = () => {
  // Dados mockados
  const totalBooks = 1500;
  const totalUsers = 300;
  const totalLoans = 1200;
  const totalFines = 300;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">
        Dashboard da Biblioteca
      </h1>

      {/* Cards de Visão Geral */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Total de Livros
            </h2>
            <p className="text-2xl text-gray-900">{totalBooks}</p>
          </div>
          <FaBook className="text-4xl text-blue-500" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Total de Usuários
            </h2>
            <p className="text-2xl text-gray-900">{totalUsers}</p>
          </div>
          <FaUsers className="text-4xl text-green-500" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Empréstimos Ativos
            </h2>
            <p className="text-2xl text-gray-900">{totalLoans}</p>
          </div>
          <FaClipboardList className="text-4xl text-yellow-500" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Multas Pendentes
            </h2>
            <p className="text-2xl text-gray-900">${totalFines}</p>
          </div>
          <FaFileInvoiceDollar className="text-4xl text-red-500" />
        </div>
      </div>

      {/* Gráficos ou Tabelas de Métricas */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Visão Geral das Métricas
        </h2>
        <div className="space-y-4">
          {/* Gráfico Simples ou Tabela (mockado) */}
          <div className="flex justify-between text-gray-700">
            <span>Livros Emprestados este Mês</span>
            <span className="font-bold text-xl">500</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Livros Devolvidos</span>
            <span className="font-bold text-xl">450</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Novos Cadastros de Usuários</span>
            <span className="font-bold text-xl">50</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
