"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Reader, CreateReaderRequest } from "../../../types/index";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";

// Schema de validação com Zod
const readerSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme a senha"),
    address: z.object({
      cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido"),
      street: z.string().min(3, "Rua deve ter no mínimo 3 caracteres"),
      neighborhood: z.string().min(2, "Bairro deve ter no mínimo 2 caracteres"),
      city: z.string().min(2, "Cidade deve ter no mínimo 2 caracteres"),
      number: z.string().min(1, "Número é obrigatório"),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ReaderFormData = z.infer<typeof readerSchema>;

interface ReaderFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateReaderRequest) => void | Promise<void>;
  reader?: Reader | null;
  libraryId: string;
  loading?: boolean;
}

export function ReaderFormDialog({
  open,
  onOpenChange,
  onSubmit,
  reader,
  libraryId,
  loading = false,
}: ReaderFormDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ReaderFormData>({
    resolver: zodResolver(readerSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      password: "",
      confirmPassword: "",
      address: {
        cep: "",
        street: "",
        neighborhood: "",
        city: "",
        number: "",
      },
    },
  });

  useEffect(() => {
    if (reader) {
      reset({
        name: reader.name,
        email: reader.email,
        cpf: reader.cpf,
        password: "",
        confirmPassword: "",
        address: reader.address,
      });
    } else {
      reset({
        name: "",
        email: "",
        cpf: "",
        password: "",
        confirmPassword: "",
        address: {
          cep: "",
          street: "",
          neighborhood: "",
          city: "",
          number: "",
        },
      });
    }
  }, [reader, open, reset]);

  const handleFormSubmit = async (data: ReaderFormData) => {
    try {
      // Preparar dados no formato esperado pela API
      const readerData: CreateReaderRequest = {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        password: data.password,
        libraryId: libraryId,
        address: {
          cep: data.address.cep,
          street: data.address.street,
          neighborhood: data.address.neighborhood,
          city: data.address.city,
          number: data.address.number,
        },
      };

      // Chamar o onSubmit passado como prop (vem da página)
      await onSubmit(readerData);

      // Limpar o formulário após sucesso
      if (!reader) {
        reset();
      }
    } catch (error) {
      console.error("Erro no formulário:", error);
    }
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{reader ? "Editar Leitor" : "Novo Leitor"}</DialogTitle>
          <DialogDescription>
            {reader
              ? "Atualize as informações do leitor"
              : "Preencha os dados para cadastrar um novo leitor"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Dados Pessoais</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input id="name" {...register("name")} disabled={loading} />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  {...register("cpf")}
                  onChange={(e) => {
                    const formatted = formatCPF(e.target.value);
                    setValue("cpf", formatted);
                  }}
                  disabled={loading}
                />
                {errors.cpf && (
                  <p className="text-sm text-destructive">
                    {errors.cpf.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Senha de Acesso</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="password">Senha *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    {...register("password")}
                    disabled={loading}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Digite a senha novamente"
                    {...register("confirmPassword")}
                    disabled={loading}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
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
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Endereço</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="cep">CEP *</Label>
                <Input
                  id="cep"
                  placeholder="00000-000"
                  maxLength={9}
                  {...register("address.cep")}
                  onChange={(e) => {
                    const formatted = formatCEP(e.target.value);
                    setValue("address.cep", formatted);
                  }}
                  disabled={loading}
                />
                {errors.address?.cep && (
                  <p className="text-sm text-destructive">
                    {errors.address.cep.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  {...register("address.city")}
                  disabled={loading}
                />
                {errors.address?.city && (
                  <p className="text-sm text-destructive">
                    {errors.address.city.message}
                  </p>
                )}
              </div>
              <div className="col-span-2 space-y-1">
                <Label htmlFor="street">Rua *</Label>
                <Input
                  id="street"
                  {...register("address.street")}
                  disabled={loading}
                />
                {errors.address?.street && (
                  <p className="text-sm text-destructive">
                    {errors.address.street.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  {...register("address.neighborhood")}
                  disabled={loading}
                />
                {errors.address?.neighborhood && (
                  <p className="text-sm text-destructive">
                    {errors.address.neighborhood.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="number">Número *</Label>
                <Input
                  id="number"
                  {...register("address.number")}
                  disabled={loading}
                />
                {errors.address?.number && (
                  <p className="text-sm text-destructive">
                    {errors.address.number.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {reader ? "Atualizando..." : "Cadastrando..."}
                </>
              ) : reader ? (
                "Atualizar"
              ) : (
                "Cadastrar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
