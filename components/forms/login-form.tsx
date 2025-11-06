"use client";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { FooterForm } from "./footer-form";
import { Input } from "../ui/input";
import { HeaderForm } from "./header-form";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../.././hooks/use-auth";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onNavigateToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onNavigateToRegister,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      toast({
        title: "Conta criada com sucesso! 🎉",
        description: "Agora você pode fazer login.",
      });
    }
  }, [searchParams, toast]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("📤 Tentando fazer login:", data.email);

      const result = await login(data.email, data.password);

      if (!result.success) {
        toast({
          title: "Erro ao fazer login",
          description: result.error || "Email ou senha incorretos.",
          variant: "destructive",
        });
        return;
      }

      console.log("✅ Login bem-sucedido!");

      toast({
        title: "Login realizado! 🎉",
        description: "Redirecionando...",
      });

      // O redirecionamento já é feito pelo hook useAuth
    } catch (error) {
      console.error("❌ Erro no login:", error);
      toast({
        title: "Erro",
        description: "Erro ao conectar com o servidor.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <HeaderForm
          title="Bem-vindo de volta"
          subtitle="Faça login para acessar o sistema"
        />

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>

            <FooterForm
              text="Não tem uma conta?"
              linkText="Criar conta"
              onLinkClick={onNavigateToRegister}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
