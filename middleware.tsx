import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "./lib/services/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  console.log("🔒 Middleware executando para:", pathname);

  const publicPaths = [
    "/",
    "/login",
    "/register",
    "/api/authenticate",
    "/api/library",
  ];

  if (publicPaths.some((path) => pathname === path)) {
    console.log("✅ Rota pública, liberando acesso");
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    console.log("✅ Rota de API, liberando acesso");
    return NextResponse.next();
  }

  if (!token) {
    console.log("❌ Sem token, redirecionando para /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = decodeToken(token);

  if (!user) {
    console.log("❌ Token inválido ou expirado, redirecionando para /login");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  console.log("👤 Usuário autenticado:", user.role, user.id);

  // Rotas /library/* são apenas para LIBRARY
  if (pathname.startsWith("/library") && user.role !== "LIBRARY") {
    console.log("❌ Acesso negado: tentou acessar /library sem ser LIBRARY");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  // Rotas /reader/* são apenas para READER
  if (pathname.startsWith("/reader") && user.role !== "READER") {
    console.log("❌ Acesso negado: tentou acessar /reader sem ser READER");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  console.log("✅ Acesso autorizado");
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico
     * - arquivos públicos (*.png, *.jpg, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
};
