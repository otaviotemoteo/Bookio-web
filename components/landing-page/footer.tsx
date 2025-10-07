import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t justify-items-center">
      <div className="container py-12 md:py-16">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Bookio</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Sistema completo de gerenciamento bibliotecário que moderniza e
            automatiza todos os processos de uma biblioteca.
          </p>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Bookio. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
