import { LoginForm } from "../../../components/forms/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const finalUrl = callbackUrl ?? "/dashboard";

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border">
        {/* Header */}
        <div className="mb-8 text-center space-y-2">
          <p className="text-muted-foreground">Faça login na sua conta</p>
        </div>

        {/* Form */}
        <LoginForm callbackUrl={finalUrl} />

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-muted-foreground">
          Não tem conta?{" "}
          <a
            className="text-primary hover:underline font-medium"
            href={`/register?callbackUrl=${encodeURIComponent(finalUrl)}`}
          >
            Criar conta
          </a>
        </p>
      </div>
    </div>
  );
}
