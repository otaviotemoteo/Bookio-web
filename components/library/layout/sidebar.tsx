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
  FaSignOutAlt,
} from "react-icons/fa";
import { BookOpen } from "lucide-react";

// Lista de itens para tornar o código mais limpo
const menuItems = [
  { href: "/library/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
  { href: "/library/books", icon: <FaBook />, label: "Gestão do Acervo" },
  {
    href: "/library/loans",
    icon: <FaClipboardList />,
    label: "Empréstimos / Devoluções",
  },
  {
    href: "/library/reservations",
    icon: <FaCalendarAlt />,
    label: "Gestão de Reservas",
  },
  {
    href: "/library/payments",
    icon: <FaRegMoneyBillAlt />,
    label: "Controle de Multas",
  },
  {
    href: "/library/readers",
    icon: <FaUsers />,
    label: "Gestão de Usuários",
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-blue-50 text-blue-900 flex flex-col border-r border-blue-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-blue-100">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <span className="text-xl font-semibold">Bookio</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        <ul className="flex flex-col gap-1 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200"
              >
                <span className="text-blue-600">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-4 py-4 border-t border-blue-100">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-medium text-blue-700 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition-colors duration-200"
        >
          <FaSignOutAlt className="text-red-500" />
          Sair
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
