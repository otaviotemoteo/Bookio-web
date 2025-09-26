"use client";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { HeaderForm } from "./header-form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FooterForm } from "./footer-form";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onNavigateToLogin?: () => void;
  onRegisterSuccess?: (data: RegisterFormData) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onNavigateToLogin,
  onRegisterSuccess,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (!termsAccepted) {
      alert("Você deve aceitar os termos de serviço para continuar.");
      return;
    }

    setLoading(true);
    try {
      const validatedData = registerSchema.parse(data);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Register data:", validatedData);
      onRegisterSuccess?.(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err: z.ZodIssue) => {
          setError(err.path[0] as keyof RegisterFormData, {
            message: err.message,
          });
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <Card className="w-160 bg-white backdrop-blur-sm border-white/20 shadow-xl">
        {" "}
        <HeaderForm
          title="Criar sua conta"
          subtitle="Junte-se ao Bookio e modernize sua biblioteca"
        />
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700"
              >
                Nome completo
              </Label>
              <Input
                {...register("name")}
                id="name"
                placeholder="João Silva"
                className="bg-gray-50 border-gray-200 focus:bg-white"
              />
              {errors.name && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

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

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-gray-700"
              >
                Confirmar senha
              </Label>
              <div className="relative">
                <Input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-gray-50 border-gray-200 focus:bg-white pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={loading || !termsAccepted}
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </Button>

          <FooterForm
            text="Já tem uma conta?"
            linkText="Logar"
            onLinkClick={onNavigateToLogin}
          />
        </CardContent>
      </Card>
    </div>
  );
};
