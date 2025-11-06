"use client";

import { LoginForm } from "../../../components/forms/login-form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleNavigateToRegister = () => {
    router.push("/register");
  };

  return <LoginForm onNavigateToRegister={handleNavigateToRegister} />;
}
