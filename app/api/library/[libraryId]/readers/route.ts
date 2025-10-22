import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { libraryId: string } }
) {
  try {
    const { libraryId } = params;

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/library/${libraryId}/readers`;
    console.log("📤 GET /library/:id/readers:", apiUrl);

    const token = request.headers.get("authorization");

    const response = await fetch(apiUrl, {
      method: "GET",
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
        { error: data.message || "Erro ao buscar leitores" },
        { status: response.status }
      );
    }

    console.log("✅ Leitores listados com sucesso!");
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ ERRO NO SERVIDOR:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor: " + error.message },
      { status: 500 }
    );
  }
}
