"use client";

import { Eye, EyeOff } from "lucide-react";
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
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    cnpj: z
      .string()
      .min(14, "CNPJ deve ter 14 dígitos")
      .regex(/^\d{14}$/, "CNPJ deve conter apenas números"),
    address: z.object({
      cep: z
        .string()
        .min(8, "CEP deve ter 8 dígitos")
        .regex(/^\d{8}$/, "CEP deve conter apenas números"),
      street: z.string().min(3, "Rua deve ter pelo menos 3 caracteres"),
      neighborhood: z.string().min(2, "Bairro deve ter pelo menos 2 caracteres"),
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
  onRegisterSuccess?: (data: RegisterFormData) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onNavigateToLogin,
  onRegisterSuccess,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const cep = watch("address.cep");

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.slice(0, 14);
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.slice(0, 8);
  };

  const searchCEP = async (cepValue: string) => {
    if (cepValue.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
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
    setLoading(true);
    try {
      // Remove o confirmPassword antes de enviar
      const { confirmPassword, ...registerData } = data;

      console.log("Enviando dados:", registerData);

      // Chama a API Route do Next.js
      const response = await fetch("/api/library", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Mostra o erro da API
        const errorMessage = result.error || "Erro ao criar conta";
        console.error("Erro ao criar conta:", errorMessage);
        alert(errorMessage);
        return;
      }

      // Sucesso!
      console.log("✅ Conta criada com sucesso:", result);
      alert("🎉 Conta criada com sucesso!");
      onRegisterSuccess?.(data);

    } catch (error) {
      console.error("Erro no registro:", error);
      alert("Erro ao criar conta. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-white backdrop-blur-sm border-white/20 shadow-xl">
        <HeaderForm
          title="Criar sua conta"
          subtitle="Junte-se ao Bookio e modernize sua biblioteca"
        />
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
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
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj" className="text-sm font-semibold text-gray-700">
                CNPJ
              </Label>
              <Input
                {...register("cnpj")}
                id="cnpj"
                placeholder="00000000000000"
                maxLength={14}
                onChange={(e) => {
                  const formatted = formatCNPJ(e.target.value);
                  e.target.value = formatted;
                }}
                className="bg-gray-50 border-gray-200 focus:bg-white"
              />
              {errors.cnpj && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.cnpj.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
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
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
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

            <div className="border-t pt-4 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Endereço</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep" className="text-sm font-semibold text-gray-700">
                    CEP
                  </Label>
                  <Input
                    {...register("address.cep")}
                    id="cep"
                    placeholder="00000000"
                    maxLength={8}
                    onChange={(e) => {
                      const formatted = formatCEP(e.target.value);
                      e.target.value = formatted;
                      setValue("address.cep", formatted);
                      searchCEP(formatted);
                    }}
                    className="bg-gray-50 border-gray-200 focus:bg-white"
                  />
                  {errors.address?.cep && (
                    <p className="text-red-500 text-sm font-medium">
                      {errors.address.cep.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="street" className="text-sm font-semibold text-gray-700">
                    Rua
                  </Label>
                  <Input
                    {...register("address.street")}
                    id="street"
                    placeholder="Rua das Flores"
                    className="bg-gray-50 border-gray-200 focus:bg-white"
                  />
                  {errors.address?.street && (
                    <p className="text-red-500 text-sm font-medium">
                      {errors.address.street.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="number" className="text-sm font-semibold text-gray-700">
                    Número
                  </Label>
                  <Input
                    {...register("address.number")}
                    id="number"
                    placeholder="123"
                    className="bg-gray-50 border-gray-200 focus:bg-white"
                  />
                  {errors.address?.number && (
                    <p className="text-red-500 text-sm font-medium">
                      {errors.address.number.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="neighborhood" className="text-sm font-semibold text-gray-700">
                    Bairro
                  </Label>
                  <Input
                    {...register("address.neighborhood")}
                    id="neighborhood"
                    placeholder="Centro"
                    className="bg-gray-50 border-gray-200 focus:bg-white"
                  />
                  {errors.address?.neighborhood && (
                    <p className="text-red-500 text-sm font-medium">
                      {errors.address.neighborhood.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-semibold text-gray-700">
                    Cidade
                  </Label>
                  <Input
                    {...register("address.city")}
                    id="city"
                    placeholder="São Paulo"
                    className="bg-gray-50 border-gray-200 focus:bg-white"
                  />
                  {errors.address?.city && (
                    <p className="text-red-500 text-sm font-medium">
                      {errors.address.city.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={loading}
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