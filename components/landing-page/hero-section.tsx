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
            <Button variant="outline" size="lg">
              Ver Demonstração
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">10,000+</div>
            <div className="text-sm text-muted-foreground">
              Livros Gerenciados
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">5,000+</div>
            <div className="text-sm text-muted-foreground">Usuários Ativos</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
        <div className="h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
        <div className="h-64 w-64 rounded-full bg-accent/5 blur-3xl"></div>
      </div>
    </section>
  );
}
