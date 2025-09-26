import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh bg-gradient-to-br from-[#e7f1f9] via-[#f0f6fb] to-[#e2edf7] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-blue-400/30 rounded-full blur-3xl" />

      <div className="relative z-10 flex h-dvh">
        <div className="hidden lg:flex lg:flex-1 items-center justify-center p-12">
          <div className="max-w-lg space-y-8 text-center bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-md">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-slate-800">Bookio</h1>
              <p className="text-xl text-slate-700 leading-relaxed">
                Sistema completo de gerenciamento bibliotecário
              </p>
            </div>

            <div className="space-y-6 text-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Controle de acervo automatizado</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Interação otimizada com usuários</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Operações eficientes e modernas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center lg:p-16">
          <div className="w-full max-w-lg">
            <Card className="border-slate-300/50 bg-white/70 backdrop-blur-xl shadow-2xl h-fit">
              <CardHeader className="text-center px-2 py-2">
                {" "}
                <div className="lg:hidden mb-8">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                    Bookio
                  </h1>
                </div>
                <CardTitle className="text-2xl font-semibold text-white mb-4"></CardTitle>
                <CardDescription className="text-slate-400 text-base leading-relaxed"></CardDescription>
              </CardHeader>

              <CardContent className="px-10 pb-12 pt-0">
                {" "}
                {children}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
