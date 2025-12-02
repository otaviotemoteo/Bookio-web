"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/use-auth";
import { useLibrary } from "../../../hooks/use-library";
import { Library } from "../../../types/index";
import { ProfileHeader } from "../../../components/library/profile/profile-header";
import { ProfileInfo } from "../../../components/library/profile/profile-info";
import { ProfileEditForm } from "../../../components/library/profile/profile-edit-form";
import { ProfileDeleteDialog } from "../../../components/library/profile/profile-delete-dialog";

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth();
  const { getLibrary, isLoading } = useLibrary();
  const [library, setLibrary] = useState<Library | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadLibrary();
    }
  }, [user]);

  const loadLibrary = async () => {
    if (!user?.id) return;

    const result = await getLibrary(user.id);
    if (result.success && result.data) {
      setLibrary(result.data);
    }
  };

  const handleUpdateSuccess = (updatedLibrary: Library) => {
    setLibrary(updatedLibrary);
    setIsEditing(false);
  };

  // Loading único - mostra enquanto carrega auth, biblioteca ou se não tem dados
  if (authLoading || isLoading || !library) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ProfileHeader
        library={library}
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
      />

      {isEditing ? (
        <ProfileEditForm
          library={library}
          onSuccess={handleUpdateSuccess}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileInfo library={library} />
      )}

      <ProfileDeleteDialog libraryId={library.id} libraryName={library.name} />
    </div>
  );
}