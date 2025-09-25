import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  BookOpen,
  Users,
  RefreshCw,
  Search,
  BarChart3,
  CreditCard,
  Bell,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Gestão de Acervo",
    description:
      "Cadastro completo de materiais com controle de estoque em tempo real e categorização inteligente.",
  },
  {
    icon: Users,
    title: "Gestão de Usuários",
    description:
      "Perfis diferenciados para bibliotecários e estudantes com autenticação segura e histórico pessoal.",
  },
  {
    icon: RefreshCw,
    title: "Sistema de Empréstimos",
    description:
      "Check-out digital simplificado com renovações online e sistema de reservas inteligentes.",
  },
  {
    icon: Search,
    title: "Busca Avançada",
    description:
      "Filtros por título, autor, categoria, ano e disponibilidade para encontrar materiais rapidamente.",
  },
  {
    icon: BarChart3,
    title: "Relatórios e Analytics",
    description:
      "Dashboard administrativo com visão geral em tempo real e relatórios de circulação detalhados.",
  },
  {
    icon: CreditCard,
    title: "Gestão Financeira",
    description:
      "Controle automático de multas com integração a gateways de pagamento e histórico financeiro.",
  },
  {
    icon: Bell,
    title: "Sistema de Notificações",
    description:
      "Alertas por email para lembretes de devolução e notificações de disponibilidade.",
  },
  {
    icon: Shield,
    title: "Segurança Avançada",
    description:
      "Diferentes níveis de acesso e proteção de dados com backup automático.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="funcionalidades"
      className="py-20 md:py-32 justify-items-center"
    >
      {/* Container que centraliza a seção */}
      <div className="container text-center">
        <div className="mx-auto max-w-2xl mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Funcionalidades Completas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tudo que você precisa para modernizar e automatizar sua biblioteca
          </p>
        </div>

        {/* Grid de cards, ajustada para garantir centralização */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 hover:border-primary/20 transition-colors"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
