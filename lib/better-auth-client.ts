"use client";

import type { AuthResponse, AuthSession } from "../types/library/auth";

type SignInPayload = { email: string; password: string };
type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  role?: "student" | "library";
};

const jsonHeaders = { "Content-Type": "application/json" };

/**
 * Troque estas chamadas por:
 * - o SDK oficial do BetterAuth (se você estiver usando), ou
 * - os endpoints corretos da sua API
 */
export async function signIn(
  payload: SignInPayload
): Promise<AuthResponse<AuthSession>> {
  try {
    const res = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        error: { message: data?.message ?? "Falha no login", code: data?.code },
      };
    }
    return { data };
  } catch (e: any) {
    return { error: { message: e?.message ?? "Erro inesperado" } };
  }
}

export async function signUp(
  payload: SignUpPayload
): Promise<AuthResponse<void>> {
  try {
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        error: {
          message: data?.message ?? "Falha no cadastro",
          code: data?.code,
        },
      };
    }
    return { data };
  } catch (e: any) {
    return { error: { message: e?.message ?? "Erro inesperado" } };
  }
}

export async function getSession(): Promise<AuthResponse<AuthSession>> {
  try {
    const res = await fetch("/api/auth/session", { method: "GET" });
    const data = await res.json();
    if (!res.ok) {
      return { error: { message: data?.message ?? "Sessão inválida" } };
    }
    return { data };
  } catch (e: any) {
    return { error: { message: e?.message ?? "Erro inesperado" } };
  }
}

export async function signOut(): Promise<AuthResponse<void>> {
  try {
    const res = await fetch("/api/auth/sign-out", { method: "POST" });
    if (!res.ok) {
      const data = await res.json();
      return { error: { message: data?.message ?? "Falha ao sair" } };
    }
    return { data: undefined };
  } catch (e: any) {
    return { error: { message: e?.message ?? "Erro inesperado" } };
  }
}
