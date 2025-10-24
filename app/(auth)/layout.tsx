import type { ReactNode } from "react";
import { BookOpen } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Section - Branding */}
            <div className="hidden lg:flex flex-col space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-900">Bookio</h1>
                  <p className="text-slate-600">Sistema de Gestão Bibliotecária</p>
                </div>
              </div>

              <div className="space-y-4 pl-4 border-l-4 border-blue-600">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-800">
                    Modernize sua biblioteca
                  </h3>
                  <p className="text-slate-600">
                    Gerencie seu acervo, leitores e empréstimos de forma simples e eficiente.
                  </p>
                </div>

                <div className="space-y-3 text-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span>Controle completo de acervo</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span>Gestão de leitores e empréstimos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span>Relatórios e estatísticas em tempo real</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-full">
              {/* Mobile branding */}
              <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Bookio</h1>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}