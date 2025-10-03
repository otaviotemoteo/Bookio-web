"use client";

import React, { ReactNode } from "react";
import Sidebar from "../../../components/library/layout/sidebar";
import Header from "../../../components/library/layout/header";

interface LayoutProps {
  children: ReactNode; // Recebe o conteúdo específico de cada página
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Sidebar fixa */}
      <div className="flex-1 flex flex-col">
        <Header userName="Bibliotecário" userAvatarUrl="/path/to/avatar.jpg" />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>{" "}
        {/* Conteúdo da página */}
      </div>
    </div>
  );
};

export default Layout;
