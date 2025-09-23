import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="mx-auto flex min-h-dvh w-full max-w-5xl items-center justify-center px-4">
        <Card className="w-full max-w-md border-slate-800/60 bg-slate-900/70 backdrop-blur-md">
          <CardHeader className="text-center">
            {/* coloque sua logo aqui se quiser */}
            {/* <Image src="/logo.svg" alt="Bookio" width={32} height={32} className="mx-auto mb-2" /> */}
            <CardTitle className="text-2xl font-semibold text-white">
              Bookio
            </CardTitle>
            <CardDescription className="text-slate-300"></CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
