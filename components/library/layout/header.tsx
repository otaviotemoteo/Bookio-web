"use client";

import React from "react";
import Image from "next/image";

interface HeaderProps {
  userName: string;
  userAvatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({
  userName = "Usuário",
  userAvatarUrl,
}) => {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      <div className="flex items-center">
        <Image
          src="/logo-bookio.png"
          alt="Bookio Logo"
          width={120}
          height={40}
        />
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium">{userName}</span>
        {userAvatarUrl ? (
          <Image
            src={userAvatarUrl}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold">
            {userName[0]}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
