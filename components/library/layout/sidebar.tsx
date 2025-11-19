"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  RefreshCw,
  CalendarCheck,
  Banknote,
  User,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    href: "/library/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Dashboard",
  },
  {
    href: "/library/books",
    icon: <BookOpen className="w-5 h-5" />,
    label: "Gestão do Acervo",
  },
  {
    href: "/library/loans",
    icon: <RefreshCw className="w-5 h-5" />,
    label: "Empréstimos / Devoluções",
  },
  {
    href: "/library/scheduling",
    icon: <CalendarCheck className="w-5 h-5" />,
    label: "Gestão de Reservas",
  },
  {
    href: "/library/payments",
    icon: <Banknote className="w-5 h-5" />,
    label: "Controle de Multas",
  },
  {
    href: "/library/readers",
    icon: <Users className="w-5 h-5" />,
    label: "Gestão de Usuários",
  },
];

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <aside className="w-64 h-screen bg-blue-50 text-blue-900 flex flex-col border-r border-blue-100 shadow-sm">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-blue-100">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <span className="text-xl font-semibold">Bookio</span>
      </div>

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

      <div className="px-2 py-4 border-t border-blue-100 space-y-1">
        <Link
          href="/library/profile"
          className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200"
        >
          <User className="w-5 h-5 text-blue-600" />
          Perfil
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-sm font-medium text-blue-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-md transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
