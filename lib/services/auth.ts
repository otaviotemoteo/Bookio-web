import { AuthUser, DecodedToken } from "../../types/index";
import { jwtDecode } from "jwt-decode";

// Função para decodificar token (usada pelo middleware)
export function decodeToken(token: string): AuthUser | null {
  try {
    const decoded = jwtDecode<DecodedToken>(token);

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }

    return {
      id: decoded.id,
      email: decoded.email || "",
      role: decoded.role as "LIBRARY" | "READER",
    };
  } catch {
    return null;
  }
}

class AuthService {
  // Login
  async login(email: string, password: string): Promise<AuthUser> {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erro ao fazer login");
    }

    const data = await response.json();

    // Salva usuário no sessionStorage
    sessionStorage.setItem("user", JSON.stringify(data.user));

    return data.user;
  }

  // Logout
  async logout(): Promise<void> {
    await fetch("/api/logout", { method: "POST" });
    sessionStorage.removeItem("user");
  }

  // Pega usuário do cache
  getCurrentUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    const cached = sessionStorage.getItem("user");
    return cached ? JSON.parse(cached) : null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  getUserRole(): "LIBRARY" | "READER" | null {
    return this.getCurrentUser()?.role || null;
  }

  isLibrary(): boolean {
    return this.getUserRole() === "LIBRARY";
  }

  isReader(): boolean {
    return this.getUserRole() === "READER";
  }
}

export const authService = new AuthService();
