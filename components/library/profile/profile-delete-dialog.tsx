"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLibrary } from "../../../hooks/use-library";
import { useAuth } from "../../../hooks/use-auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useToast } from "../../ui/use-toast";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

interface ProfileDeleteDialogProps {
  libraryId: string;
  libraryName: string;
}

export const ProfileDeleteDialog: React.FC<ProfileDeleteDialogProps> = ({
  libraryId,
  libraryName,
}) => {
  const [confirmText, setConfirmText] = useState("");
  const [open, setOpen] = useState(false);
  const { deleteLibrary, isLoading } = useLibrary();
  const { logout } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    if (confirmText !== "EXCLUIR") {
      toast({
        title: "Confirmação incorreta",
        description: 'Digite "EXCLUIR" para confirmar.',
        variant: "destructive",
      });
      return;
    }

    const result = await deleteLibrary(libraryId);

    if (result.success) {
      toast({
        title: "Biblioteca excluída",
        description: "Sua conta foi removida permanentemente.",
      });

      // Faz logout e redireciona
      await logout();
      router.push("/");
    } else {
      toast({
        title: "Erro ao excluir",
        description: result.error || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-lg text-destructive flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Zona de Perigo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Excluir sua biblioteca removerá permanentemente todos os dados
          associados, incluindo livros, leitores, empréstimos e histórico.{" "}
          <strong>Esta ação não pode ser desfeita.</strong>
        </p>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="gap-2">
              <Trash2 className="w-4 h-4" />
              Excluir Biblioteca
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Tem certeza absoluta?
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <p>
                  Você está prestes a excluir permanentemente a biblioteca{" "}
                  <strong>{libraryName}</strong>.
                </p>
                <p className="text-destructive font-semibold">
                  Esta ação é irreversível e todos os dados serão perdidos!
                </p>
                <div className="space-y-2 pt-4">
                  <Label htmlFor="confirm">
                    Digite <strong>EXCLUIR</strong> para confirmar:
                  </Label>
                  <Input
                    id="confirm"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="EXCLUIR"
                    className="font-mono"
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmText("")}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={confirmText !== "EXCLUIR" || isLoading}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Excluindo...
                  </>
                ) : (
                  "Excluir Permanentemente"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
