import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../lib/services/auth";
import { AuthUser } from "../types/index";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Carrega do cache
    setUser(authService.getCurrentUser());
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const loggedUser = await authService.login(email, password);
      setUser(loggedUser);

      if (loggedUser.role === "LIBRARY") {
        router.push("/library/dashboard");
      } else {
        router.push("/reader/dashboard");
      }

      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao fazer login";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    router.push("/login");
  };

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    isLibrary: user?.role === "LIBRARY",
    isReader: user?.role === "READER",
  };
}
