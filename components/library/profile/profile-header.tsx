"use client";

import React from "react";
import { Library } from "../../../types/index";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Pencil, X } from "lucide-react";

interface ProfileHeaderProps {
  library: Library;
  isEditing: boolean;
  onToggleEdit: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  library,
  isEditing,
  onToggleEdit,
}) => {
  const initials = library.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-blue-600 text-white text-xl font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{library.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{library.email}</p>
            </div>
          </div>

          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={onToggleEdit}
            className="gap-2"
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" />
                Cancelar
              </>
            ) : (
              <>
                <Pencil className="w-4 h-4" />
                Editar Perfil
              </>
            )}
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};
