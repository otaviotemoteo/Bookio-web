"use client";

import { RegisterForm } from "../../../components/forms/register-form";
import { useSearchParams, useRouter } from "next/navigation";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const handleRegisterSuccess = (data: any) => {
    console.log("Registro realizado:", data);
    router.push(callbackUrl);
  };

  const handleNavigateToLogin = () => {
    router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  };

  return (
    <RegisterForm
      onRegisterSuccess={handleRegisterSuccess}
      onNavigateToLogin={handleNavigateToLogin}
    />
  );
}
