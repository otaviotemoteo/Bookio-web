import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <BookOpen className="w-16 h-16 text-blue-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Página não encontrada
      </h2>
      <p className="text-gray-600 text-center">
        Verifique a URL ou volte para a <Link href="/" className="text-blue-400">página inicial</Link>.
      </p>
    </div>
  );
}