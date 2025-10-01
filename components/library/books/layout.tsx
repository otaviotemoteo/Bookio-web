"use client";

import React, { ReactNode } from "react";
import Sidebar from "../../library/layout/sidebar";
import Header from "../../library/layout/header";

interface LayoutProps {
  children: ReactNode; // Aqui é necessário tipar corretamente o `children`
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>{" "}
        {/* Conteúdo da página */}
      </div>
    </div>
  );
};

export default Layout;
