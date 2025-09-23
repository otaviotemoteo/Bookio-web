import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookio",
  description: "Sistema de gerenciamento de biblioteca",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
