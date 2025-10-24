"use client";

import { RegisterForm } from "../../../components/forms/register-form";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegisterSuccess = () => {
    router.push("/login?registered=true");
  };

  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  return (
    <RegisterForm
      onRegisterSuccess={handleRegisterSuccess}
      onNavigateToLogin={handleNavigateToLogin}
    />
  );
}