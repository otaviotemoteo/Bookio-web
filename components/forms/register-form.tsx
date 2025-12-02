"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { HeaderForm } from "./header-form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FooterForm } from "./footer-form";
import { useToast } from "../ui/use-toast";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    cnpj: z
      .string()
      .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, "CNPJ inválido"),
    address: z.object({
      cep: z.string().regex(/^\d{5}\-\d{3}$/, "CEP inválido"),
      street: z.string().min(3, "Rua deve ter pelo menos 3 caracteres"),
      neighborhood: z
        .string()
        .min(2, "Bairro deve ter pelo menos 2 caracteres"),
      city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
      number: z.string().min(1, "Número é obrigatório"),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onNavigateToLogin?: () => void;
  onRegisterSuccess?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onNavigateToLogin,
  onRegisterSuccess,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      cnpj: "",
      address: {
        cep: "",
        street: "",
        neighborhood: "",
        city: "",
        number: "",
      },
    },
  });

  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  };

  const searchCEP = async (cepValue: string) => {
    const cleanCep = cepValue.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCep}/json/`
        );
        const data = await response.json();

        if (!data.erro) {
          setValue("address.street", data.logradouro);
          setValue("address.neighborhood", data.bairro);
          setValue("address.city", data.localidade);
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Remove o confirmPassword antes de enviar
      const { confirmPassword, ...registerData } = data;

      console.log("📤 Enviando dados de registro:", registerData);

      const response = await fetch("/api/library", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          title: "Erro ao criar conta",
          description: result.error || "Verifique os dados e tente novamente.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Conta criada com sucesso! 🎉",
        description: "Você já pode fazer login.",
      });

      onRegisterSuccess?.();
    } catch (error) {
      console.error("❌ Erro no registro:", error);
      toast({
        title: "Erro",
        description: "Erro ao conectar com o servidor.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-4xl bg-white shadow-xl">
        <HeaderForm
          title="Criar sua conta"
          subtitle="Junte-se ao Bookio e modernize sua biblioteca"
        />
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Dados Principais - 2 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  {...register("name")}
                  id="name"
                  placeholder="João Silva"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input
                  {...register("cnpj")}
                  id="cnpj"
                  placeholder="00.000.000/0000-00"
                  maxLength={18}
                  onChange={(e) => {
                    const formatted = formatCNPJ(e.target.value);
                    setValue("cnpj", formatted);
                  }}
                />
                {errors.cnpj && (
                  <p className="text-sm text-destructive">
                    {errors.cnpj.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cep">CEP *</Label>
                <Input
                  {...register("address.cep")}
                  id="cep"
                  placeholder="00000-000"
                  maxLength={9}
                  onChange={(e) => {
                    const formatted = formatCEP(e.target.value);
                    setValue("address.cep", formatted);
                    searchCEP(formatted);
                  }}
                />
                {errors.address?.cep && (
                  <p className="text-sm text-destructive">
                    {errors.address.cep.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <div className="relative">
                  <Input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
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
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha *</Label>
                <div className="relative">
                  <Input
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10"
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
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Endereço - 3 colunas */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3">Endereço</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="street">Rua *</Label>
                  <Input
                    {...register("address.street")}
                    id="street"
                    placeholder="Rua das Flores"
                  />
                  {errors.address?.street && (
                    <p className="text-sm text-destructive">
                      {errors.address.street.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number">Número *</Label>
                  <Input
                    {...register("address.number")}
                    id="number"
                    placeholder="123"
                  />
                  {errors.address?.number && (
                    <p className="text-sm text-destructive">
                      {errors.address.number.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro *</Label>
                  <Input
                    {...register("address.neighborhood")}
                    id="neighborhood"
                    placeholder="Centro"
                  />
                  {errors.address?.neighborhood && (
                    <p className="text-sm text-destructive">
                      {errors.address.neighborhood.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    {...register("address.city")}
                    id="city"
                    placeholder="São Paulo"
                  />
                  {errors.address?.city && (
                    <p className="text-sm text-destructive">
                      {errors.address.city.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Criar conta"
              )}
            </Button>

            <FooterForm
              text="Já tem uma conta?"
              linkText="Fazer login"
              onLinkClick={onNavigateToLogin}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
