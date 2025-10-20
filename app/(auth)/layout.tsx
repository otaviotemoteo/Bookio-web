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
    <div className="h-screen bg-gradient-to-br from-[#e7f1f9] via-[#f0f6fb] to-[#e2edf7] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-blue-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-blue-400/30 rounded-full blur-3xl" />

      <div className="relative z-10 flex h-full">
        {/* Left Section (Information) */}
        <div className="hidden lg:flex lg:flex-1 items-center justify-center p-8">
          <div className="max-w-md space-y-6 text-center bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-md">
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold text-slate-800">Bookio</h1>
              <p className="text-lg text-slate-700 leading-relaxed">
                Sistema completo de gerenciamento bibliotecário
              </p>
            </div>

            <div className="space-y-4 text-slate-700">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Controle de acervo automatizado</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Interação otimizada com usuários</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Operações eficientes e modernas</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right Section (Form/ Card) */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <div className="w-full max-w-md">
              <CardHeader className="text-center px-4 py-4">
                <div className="lg:hidden mb-6">
                  <h1 className="text-2xl font-semibold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                    Bookio
                  </h1>
                </div>
              </CardHeader>
              <CardContent className="px-8 py-8">
                {children}
              </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
}

