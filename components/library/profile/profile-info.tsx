"use client";

import React from "react";
import { Library } from "../../../types/index";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";
import { Building2, Mail, FileText, MapPin, Calendar } from "lucide-react";

interface ProfileInfoProps {
  library: Library;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ library }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                Nome da Biblioteca
              </p>
              <p className="text-base">{library.name}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-base">{library.email}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">CNPJ</p>
              <p className="text-base">{library.cnpj}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                Cadastro realizado em
              </p>
              <p className="text-base">{formatDate(library.createdAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Endereço */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Endereço
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Logradouro
            </p>
            <p className="text-base">
              {library.address.street}, {library.address.number}
            </p>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium text-muted-foreground">Bairro</p>
            <p className="text-base">{library.address.neighborhood}</p>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium text-muted-foreground">Cidade</p>
            <p className="text-base">{library.address.city}</p>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium text-muted-foreground">CEP</p>
            <p className="text-base">{library.address.cep}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
