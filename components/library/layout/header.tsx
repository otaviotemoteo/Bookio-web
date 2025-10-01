import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";

interface HeaderProps {
  userName: string;
  userAvatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ userName, userAvatarUrl }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/logo-bookio.png"
          alt="Bookio Logo"
          width={120}
          height={40}
        />
      </div>

      <div className={styles.user}>
        <span className={styles.userName}>{userName}</span>
        {userAvatarUrl ? (
          <Image
            src={userAvatarUrl}
            alt="Avatar"
            width={40}
            height={40}
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>{userName[0]}</div>
        )}
      </div>
    </header>
  );
};

export default Header;
