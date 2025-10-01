import React, { ReactNode } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

interface LayoutProps {
  children: ReactNode;
  userName: string;
  userAvatarUrl?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  userName,
  userAvatarUrl,
}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userName={userName} userAvatarUrl={userAvatarUrl} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
