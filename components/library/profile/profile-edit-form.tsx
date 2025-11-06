"use client";

import React from "react";
import { Library, UpdateLibraryRequest } from "../../../types/index";
import { useLibrary } from "../../../hooks/use-library";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useToast } from "../../ui/use-toast";
import { Loader2, Save } from "lucide-react";

const editSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  cnpj: z.string().min(14, "CNPJ inválido"),
  address: z.object({
    cep: z.string().min(8, "CEP inválido"),
    street: z.string().min(3, "Logradouro inválido"),
    number: z.string().min(1, "Número é obrigatório"),
    neighborhood: z.string().min(2, "Bairro inválido"),
    city: z.string().min(2, "Cidade inválida"),
  }),
});

type EditFormData = z.infer<typeof editSchema>;

interface ProfileEditFormProps {
  library: Library;
  onSuccess: (updatedLibrary: Library) => void;
  onCancel: () => void;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  library,
  onSuccess,
  onCancel,
}) => {
  const { updateLibrary, isLoading } = useLibrary();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: library.name,
      email: library.email,
      cnpj: library.cnpj,
      address: {
        cep: library.address.cep,
        street: library.address.street,
        number: library.address.number,
        neighborhood: library.address.neighborhood,
        city: library.address.city,
      },
    },
  });

  const onSubmit = async (data: EditFormData) => {
    const result = await updateLibrary(library.id, data);

    if (result.success && result.data) {
      toast({
        title: "Perfil atualizado! ✅",
        description: "Suas informações foram atualizadas com sucesso.",
      });
      onSuccess(result.data);
    } else {
      toast({
        title: "Erro ao atualizar",
        description: result.error || "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Editar Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Biblioteca</Label>
            <Input {...register("name")} id="name" />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input {...register("email")} id="email" type="email" />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input {...register("cnpj")} id="cnpj" />
            {errors.cnpj && (
              <p className="text-sm text-destructive">{errors.cnpj.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Endereço */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Editar Endereço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input {...register("address.cep")} id="cep" />
              {errors.address?.cep && (
                <p className="text-sm text-destructive">
                  {errors.address.cep.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input {...register("address.number")} id="number" />
              {errors.address?.number && (
                <p className="text-sm text-destructive">
                  {errors.address.number.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Logradouro</Label>
            <Input {...register("address.street")} id="street" />
            {errors.address?.street && (
              <p className="text-sm text-destructive">
                {errors.address.street.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input {...register("address.neighborhood")} id="neighborhood" />
            {errors.address?.neighborhood && (
              <p className="text-sm text-destructive">
                {errors.address.neighborhood.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input {...register("address.city")} id="city" />
            {errors.address?.city && (
              <p className="text-sm text-destructive">
                {errors.address.city.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Salvar Alterações
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
