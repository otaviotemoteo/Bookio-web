"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardContent className="pt-12 pb-8 px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Ícone de sucesso */}
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 opacity-20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-green-100 p-4 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-600" strokeWidth={2} />
              </div>
            </div>

            {/* Título */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Conta Criada com Sucesso!
              </h1>
              <p className="text-gray-600 text-lg">
                Sua biblioteca foi registrada com sucesso no Bookio
              </p>
            </div>

            {/* Mensagem adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full">
              <p className="text-sm text-blue-800">
                Agora você pode fazer login e começar a gerenciar seus livros e usuários de forma moderna e eficiente.
              </p>
            </div>

            {/* Botões */}
            <div className="flex flex-col w-full gap-3 pt-4">
              <Button
                onClick={() => router.push("/login")}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 h-12 text-base font-semibold"
              >
                Fazer Login
              </Button>
              
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="w-full border-2 border-gray-300 hover:bg-gray-50 h-12 text-base font-semibold"
              >
                Voltar para Início
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}