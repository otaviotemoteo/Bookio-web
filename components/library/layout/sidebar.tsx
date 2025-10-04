"use client";

import React from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaClipboardList,
  FaRegMoneyBillAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { BookOpen } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-[#4A8DF8] to-[#2C6CE1] text-white flex flex-col">
      {/* Logo / Título */}
      <div className="px-6 py-4 text-2xl font-bold border-b border-gray-700 flex items-center space-x-2">
        <BookOpen className="w-7 h-7 text-white" />
        <span>Bookio</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4">
        <ul>
          <li>
            <Link
              href="/library/dashboard"
              className="flex items-center px-6 py-3 hover:bg-blue-700 hover:rounded-lg transition-all duration-300"
            >
              <FaTachometerAlt className="mr-3" /> Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/library/books"
              className="flex items-center px-6 py-3 hover:bg-blue-700 hover:rounded-lg transition-all duration-300"
            >
              <FaBook className="mr-3" /> Gestão do Acervo
            </Link>
          </li>

          <li>
            <Link
              href="/library/loans"
              className="flex items-center px-6 py-3 hover:bg-blue-700 hover:rounded-lg transition-all duration-300"
            >
              <FaClipboardList className="mr-3" /> Empréstimos / Devoluções
            </Link>
          </li>

          <li>
            <Link
              href="/library/reservations"
              className="flex items-center px-6 py-3 hover:bg-blue-700 hover:rounded-lg transition-all duration-300"
            >
              <FaCalendarAlt className="mr-3" /> Gestão de Reservas
            </Link>
          </li>

          <li>
            <Link
              href="/library/payments"
              className="flex items-center px-6 py-3 hover:bg-blue-700 hover:rounded-lg transition-all duration-300"
            >
              <FaRegMoneyBillAlt className="mr-3" /> Controle de Multas
            </Link>
          </li>

          <li>
            <Link
              href="/library/create-reader"
              className="flex items-center px-6 py-3 hover:bg-blue-700 hover:rounded-lg transition-all duration-300"
            >
              <FaUsers className="mr-3" /> Gestão de Usuários
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
