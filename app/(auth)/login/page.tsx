"use client";

import { LoginForm } from "../../../components/forms/login-form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = async () => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
      
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      if (payload.role === 'LIBRARY') {
        router.push('/library/dashboard');
      } else if (payload.role === 'READER') {
        router.push('/reader/dashboard');
      }
    } else {
      router.push('/library/dashboard');
    }
  };

  const handleNavigateToRegister = () => {
    router.push("/register");
  };

  return (
    <LoginForm
      onLoginSuccess={handleLoginSuccess}
      onNavigateToRegister={handleNavigateToRegister}
    />
  );
}