"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Search,
  Calendar,
  Heart,
  CreditCard,
  LogOut,
  User,
} from "lucide-react";

const menuItems = [
  {
    href: "/reader/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Dashboard",
    badge: undefined,
  },
  {
    href: "/reader/catalog",
    icon: <Search className="w-5 h-5" />,
    label: "Catálogo",
    badge: undefined,
  },
  {
    href: "/reader/loans",
    icon: <BookOpen className="w-5 h-5" />,
    label: "Empréstimos",
    badge: undefined,
  },
  {
    href: "/reader/reservations",
    icon: <Calendar className="w-5 h-5" />,
    label: "Reservas",
    badge: undefined,
  },
  {
    href: "/reader/favorites",
    icon: <Heart className="w-5 h-5" />,
    label: "Favoritos",
    badge: undefined,
  },
  {
    href: "/reader/payments",
    icon: <CreditCard className="w-5 h-5" />,
    label: "Pagamentos",
    badge: undefined,
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
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-2 py-4 border-t border-blue-100 space-y-1">
        <Link
          href="/reader/profile"
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
