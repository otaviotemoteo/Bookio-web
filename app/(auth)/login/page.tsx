"use client";

import { LoginForm } from "../../../components/forms/login-form";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const handleLoginSuccess = (data: any) => {
    console.log("Login realizado:", data);
    router.push(callbackUrl);
  };

  const handleNavigateToRegister = () => {
    router.push(`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  };

  return (
    <LoginForm
      onLoginSuccess={handleLoginSuccess}
      onNavigateToRegister={handleNavigateToRegister}
    />
  );
}
