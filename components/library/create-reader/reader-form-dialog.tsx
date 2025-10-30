"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Reader, CreateReaderData } from "../../../types/library/reader";
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
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Upload, X, Loader2 } from "lucide-react";
import { useToast } from "../../ui/use-toast";

// Schema de validação com Zod
const readerSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  address: z.object({
    cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido"),
    street: z.string().min(3, "Rua deve ter no mínimo 3 caracteres"),
    neighborhood: z.string().min(2, "Bairro deve ter no mínimo 2 caracteres"),
    city: z.string().min(2, "Cidade deve ter no mínimo 2 caracteres"),
    number: z.string().min(1, "Número é obrigatório"),
  }),
});

type ReaderFormData = z.infer<typeof readerSchema>;

interface ReaderFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateReaderData, picture?: File) => void | Promise<void>; // 🆕 Adicionado
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
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string>("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ReaderFormData>({
    resolver: zodResolver(readerSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      address: {
        cep: "",
        street: "",
        neighborhood: "",
        city: "",
        number: "",
      },
    },
  });

  const formName = watch("name");

  useEffect(() => {
    if (reader) {
      reset({
        name: reader.name,
        email: reader.email,
        cpf: reader.cpf,
        address: reader.address,
      });
      setPicturePreview(reader.picture || "");
    } else {
      reset({
        name: "",
        email: "",
        cpf: "",
        address: {
          cep: "",
          street: "",
          neighborhood: "",
          city: "",
          number: "",
        },
      });
      setPicturePreview("");
      setPictureFile(null);
    }
  }, [reader, open, reset]);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamanho do arquivo (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erro",
          description: "A imagem deve ter no máximo 5MB",
          variant: "destructive",
        });
        return;
      }

      setPictureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (data: ReaderFormData) => {
    try {
      // Preparar dados no formato esperado pela API
      const readerData: CreateReaderData = {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
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
      await onSubmit(readerData, pictureFile || undefined);

      // Limpar o formulário após sucesso (a página já mostra o toast)
      if (!reader) {
        reset();
        setPictureFile(null);
        setPicturePreview("");
      }
    } catch (error) {
      // O erro já é tratado na página, mas podemos logar aqui se necessário
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{reader ? "Editar Leitor" : "Novo Leitor"}</DialogTitle>
          <DialogDescription>
            {reader
              ? "Atualize as informações do leitor"
              : "Preencha os dados para cadastrar um novo leitor. Uma senha será gerada e enviada por email."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Foto de Perfil */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={picturePreview} />
              <AvatarFallback>
                {formName
                  ? formName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                  : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <Label htmlFor="picture" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  <Upload className="h-4 w-4" />
                  Carregar Foto
                </div>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePictureChange}
                  disabled={loading}
                />
              </Label>
              {picturePreview && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setPictureFile(null);
                    setPicturePreview("");
                  }}
                  disabled={loading}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

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