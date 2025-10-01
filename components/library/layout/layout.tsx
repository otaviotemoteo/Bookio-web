import React, { ReactNode } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import styles from "./Layout.module.css";

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
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Header userName={userName} userAvatarUrl={userAvatarUrl} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
