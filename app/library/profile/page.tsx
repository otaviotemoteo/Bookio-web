"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/use-auth";
import { useLibrary } from "../../../hooks/use-library";
import { Library } from "../../../types/index";
import { ProfileHeader } from "../../../components/library/profile/profile-header";
import { ProfileInfo } from "../../../components/library/profile/profile-info";
import { ProfileEditForm } from "../../../components/library/profile/profile-edit-form";
import { ProfileDeleteDialog } from "../../../components/library/profile/profile-delete-dialog";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
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

  if (isLoading || !library) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
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
