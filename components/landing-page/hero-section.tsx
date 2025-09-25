import { Button } from "../ui/button";
import { ArrowRight, BookOpen, Users, BarChart3 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary/5 py-20 md:py-32">
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <BookOpen className="h-4 w-4" />
            Sistema Completo de Gerenciamento
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance">
            Modernize sua <span className="text-primary">Biblioteca</span> com o
            Bookio
          </h1>

          <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto text-pretty">
            Sistema completo que automatiza todos os processos bibliotecários,
            desde controle de acervo até interação com usuários, otimizando
            operações e melhorando a eficiência.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Começar Agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
        <div className="h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-2 -translate-x-12">
        <div className="h-64 w-64 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
    </section>
  );
}
