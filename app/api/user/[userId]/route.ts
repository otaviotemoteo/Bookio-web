import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`;
    console.log("📤 DELETE /user/:id:", apiUrl);

    const token = request.headers.get("authorization");

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
      },
    });

    const textBody = await response.text();
    let data;

    try {
      data = textBody ? JSON.parse(textBody) : {};
    } catch (parseError) {
      console.error("❌ Erro ao parsear JSON:", parseError);
      return NextResponse.json(
        {
          error: "API externa retornou resposta inválida",
          details: textBody.slice(0, 200),
        },
        { status: 500 }
      );
    }

    if (!response.ok) {
      console.error("❌ Erro da API:", data);
      return NextResponse.json(
        { error: data.message || "Erro ao excluir usuário" },
        { status: response.status }
      );
    }

    console.log("✅ Usuário excluído com sucesso!");
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ ERRO NO SERVIDOR:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor: " + error.message },
      { status: 500 }
    );
  }
}
