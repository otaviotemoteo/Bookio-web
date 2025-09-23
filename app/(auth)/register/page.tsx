import { RegisterForm } from "../../../components/forms/register-form";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const finalUrl = callbackUrl ?? "/dashboard";

  return (
    <div className=" flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 border">
        {/* Header */}
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Criar conta</h1>
          <p className="text-muted-foreground">
            Preencha os dados para começar
          </p>
        </div>

        {/* Form */}
        <RegisterForm callbackUrl={finalUrl} />

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-muted-foreground">
          Já possui conta?{" "}
          <a
            className="text-primary hover:underline font-medium"
            href={`/login?callbackUrl=${encodeURIComponent(finalUrl)}`}
          >
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
