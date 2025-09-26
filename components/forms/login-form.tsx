"use client";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { FooterForm } from "./footer-form";
import { Input } from "../ui/input";
import { HeaderForm } from "./header-form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

// Mover schema e tipos para fora do componente
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onNavigateToRegister?: () => void;
  onLoginSuccess?: (data: LoginFormData) => void;
}

// Manter apenas UMA declaração do componente
export const LoginForm: React.FC<LoginFormProps> = ({
  onNavigateToRegister,
  onLoginSuccess,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    // Adicionar tipo aqui também
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const validatedData = loginSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Login data:", validatedData, { rememberMe });
      onLoginSuccess?.(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err: z.ZodIssue) => {
          setError(err.path[0] as keyof LoginFormData, {
            message: err.message,
          }); // Adicionar 'as keyof LoginFormData'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <Card className="w-160 bg-white backdrop-blur-sm border-white/20 shadow-xl">
        <HeaderForm
          title="Bem-vindo de volta"
          subtitle="Sistema completo que automatiza todos os processos bibliotecários"
        />

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email
              </Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="bg-gray-50 border-gray-200 focus:bg-white"
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Senha
              </Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-gray-50 border-gray-200 focus:bg-white pr-10"
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
                <p className="text-red-500 text-sm font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          <FooterForm
            text="Não tem uma conta?"
            linkText="Criar conta"
            onLinkClick={onNavigateToRegister}
          />
        </CardContent>
      </Card>
    </div>
  );
};
