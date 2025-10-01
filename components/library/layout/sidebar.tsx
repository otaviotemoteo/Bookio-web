import React from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

interface SidebarItem {
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/library/dashboard" },
  { label: "Livros", href: "/library/books" },
  { label: "Leitores", href: "/library/create-reader" },
  { label: "Empréstimos", href: "/library/loans" },
  { label: "Pagamentos", href: "/library/payments" },
  { label: "Reservas", href: "/library/reservations" },
];

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <a>{item.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
