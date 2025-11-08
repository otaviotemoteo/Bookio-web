import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`;
    console.log("📤 DELETE /user/:id:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const textBody = await response.text();
      let data;

      try {
        data = textBody ? JSON.parse(textBody) : {};
      } catch {
        data = { message: "Erro ao excluir usuário" };
      }

      console.error("❌ Erro da API:", data);
      return NextResponse.json(
        { error: data.message || "Erro ao excluir usuário" },
        { status: response.status }
      );
    }

    console.log("✅ Usuário excluído com sucesso!");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ ERRO NO SERVIDOR:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor: " + error.message },
      { status: 500 }
    );
  }
}
