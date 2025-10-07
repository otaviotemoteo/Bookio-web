import { Button } from "../ui/button";
import { BookOpen, Menu } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className=" justify-items-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Bookio</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#funcionalidades"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Funcionalidades
          </a>
          <a
            href="#modulos"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Módulos
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex cursor-pointer hover:bg-primary hover:text-white"
            >
              Entrar
            </Button>
          </Link>

          <Link href="/register">
            <Button
              size="sm"
              className="cursor-pointer bg-primary hover:bg-primary/90"
            >
              Criar Conta
            </Button>
          </Link>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
