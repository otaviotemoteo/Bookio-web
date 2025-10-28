import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: { gender: string } }
) {
  try {
    const { gender } = params;

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/books/gender/${gender}`;
    console.log("📤 GET /books/gender/:gender:", apiUrl);

    const token = cookies().get("token")?.value;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const textBody = await response.text();
    let data;

    try {
      data = textBody ? JSON.parse(textBody) : {};
    } catch (parseError) {
      console.error("❌ Erro ao parsear JSON:", parseError);
      return NextResponse.json(
        { error: "API externa retornou resposta inválida" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      console.error("❌ Erro da API:", data);
      return NextResponse.json(
        { error: data.message || "Erro ao buscar livros por gênero" },
        { status: response.status }
      );
    }

    console.log("✅ Livros encontrados!");
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("❌ ERRO NO SERVIDOR:", error);
    return NextResponse.json(
      { error: "Erro interno: " + error.message },
      { status: 500 }
    );
  }
}