"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus } from "lucide-react";

import { signUp, signIn } from "../../lib/better-auth-client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("Digite um e-mail válido"),
    password: z.string().min(6, "Mínimo de 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme a senha"),
    role: z.enum(["student", "library"]).optional(),
  })
  .refine((vals) => vals.password === vals.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não conferem",
  });

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm({
  callbackUrl = "/dashboard",
}: {
  callbackUrl?: string;
}) {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [showPass2, setShowPass2] = React.useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: undefined,
    },
    mode: "onChange",
  });

  async function onSubmit(values: RegisterValues) {
    setServerError(null);
    setIsSubmitting(true);

    const { confirmPassword, ...payload } = values;
    const res = await signUp(payload);

    if (res.error) {
      setIsSubmitting(false);
      setServerError(res.error.message ?? "Falha no cadastro");
      return;
    }

    // auto-login
    const auto = await signIn({
      email: values.email,
      password: values.password,
    });
    setIsSubmitting(false);

    if (auto.error) {
      router.replace(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      return;
    }
    router.replace(callbackUrl);
  }

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome completo"
                    autoComplete="name"
                    className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 
                               rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="voce@exemplo.com"
                    autoComplete="email"
                    className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 
                               rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
                  Perfil (opcional)
                </FormLabel>
                <FormControl>
                  <select
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 
                               shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(e.target.value || undefined)
                    }
                  >
                    <option value="">Selecione...</option>
                    <option value="student">Estudante</option>
                    <option value="library">Biblioteca</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPass ? "text" : "password"}
                        placeholder="Crie uma senha"
                        autoComplete="new-password"
                        className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 
                                   pr-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((v) => !v)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 
                                   text-gray-400 hover:text-gray-600"
                        aria-label={
                          showPass ? "Ocultar senha" : "Mostrar senha"
                        }
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Confirmar senha
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPass2 ? "text" : "password"}
                        placeholder="Repita a senha"
                        autoComplete="new-password"
                        className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 
                                   pr-10 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass2((v) => !v)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 
                                   text-gray-400 hover:text-gray-600"
                        aria-label={
                          showPass2 ? "Ocultar senha" : "Mostrar senha"
                        }
                      >
                        {showPass2 ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {serverError ? (
            <p className="text-sm text-red-600">{serverError}</p>
          ) : null}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow 
                       transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Criando conta..."
            ) : (
              <span className="inline-flex items-center gap-2">
                <UserPlus size={18} />
                Criar conta
              </span>
            )}
          </Button>
        </form>
      </Form>

      <div className="space-y-3">
        <Separator className="bg-gray-200" />
      </div>
    </div>
  );
}
