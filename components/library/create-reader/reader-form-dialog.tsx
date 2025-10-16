"use client";

import { useState, useEffect } from "react";
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
import { Upload, X } from "lucide-react";

interface ReaderFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateReaderData, picture?: File) => void;
  reader?: Reader | null;
  libraryId: string;
}

export function ReaderFormDialog({
  open,
  onOpenChange,
  onSubmit,
  reader,
  libraryId,
}: ReaderFormDialogProps) {
  const [formData, setFormData] = useState<CreateReaderData>({
    name: "",
    email: "",
    cpf: "",
    libraryId: libraryId,
    address: {
      cep: "",
      street: "",
      neighborhood: "",
      city: "",
      number: "",
    },
  });

  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string>("");

  useEffect(() => {
    if (reader) {
      setFormData({
        name: reader.name,
        email: reader.email,
        cpf: reader.cpf,
        libraryId: reader.libraryId,
        address: reader.address,
      });
      setPicturePreview(reader.picture || "");
    } else {
      setFormData({
        name: "",
        email: "",
        cpf: "",
        libraryId: libraryId,
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
  }, [reader, libraryId, open]);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPictureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, pictureFile || undefined);
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Foto de Perfil */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={picturePreview} />
              <AvatarFallback>
                {formData.name
                  ? formData.name
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
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) =>
                    setFormData({ ...formData, cpf: formatCPF(e.target.value) })
                  }
                  placeholder="000.000.000-00"
                  maxLength={14}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
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
                  value={formData.address.cep}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        cep: formatCEP(e.target.value),
                      },
                    })
                  }
                  placeholder="00000-000"
                  maxLength={9}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div className="col-span-2 space-y-1">
                <Label htmlFor="street">Rua *</Label>
                <Input
                  id="street"
                  value={formData.address.street}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, street: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  value={formData.address.neighborhood}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        neighborhood: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="number">Número *</Label>
                <Input
                  id="number"
                  value={formData.address.number}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, number: e.target.value },
                    })
                  }
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">{reader ? "Atualizar" : "Cadastrar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
