import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: { libraryId: string } }
) {
  try {
    const { libraryId } = params;

    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/library/${libraryId}`;
    console.log("📤 GET /library/:id:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        { error: data.message || "Biblioteca não encontrada" },
        { status: response.status }
      );
    }

    console.log("✅ Biblioteca encontrada!");
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ ERRO NO SERVIDOR:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { libraryId: string } }
) {
  try {
    const { libraryId } = params;
    const body = await request.json();

    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/library/${libraryId}`;
    console.log("📤 PUT /library/:id:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
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
        { error: data.message || "Erro ao atualizar biblioteca" },
        { status: response.status }
      );
    }

    console.log("✅ Biblioteca atualizada com sucesso!");
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ ERRO NO SERVIDOR:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor: " + error.message },
      { status: 500 }
    );
  }
}
