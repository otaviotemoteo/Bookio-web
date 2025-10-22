import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/library`;
    console.log("Fazendo requisição para:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const textBody = await response.text();

    let data;
    try {
      data = textBody ? JSON.parse(textBody) : {};
    } catch (parseError) {
      console.error("❌ Erro ao parsear JSON:", parseError);
      console.log("Resposta recebida não é JSON válido:", textBody);
      
      return NextResponse.json(
        { 
          error: "API externa retornou resposta inválida",
          details: textBody.slice(0, 200) // Primeiros 200 caracteres
        },
        { status: 500 }
      );
    }

    if (!response.ok) {
      console.error("❌ Erro da API externa:", data);
      return NextResponse.json(
        { error: data.message || data.detail || data.error || "Erro ao criar biblioteca" },
        { status: response.status }
      );
    }

    console.log("✅ Biblioteca criada com sucesso!");
    return NextResponse.json(data, { status: 201 });

  } catch (error: any) {
    console.error("❌ ERRO NO SERVIDOR:", error);
    console.error("Mensagem:", error.message);
    console.error("Stack:", error.stack);
    return NextResponse.json(
      { error: "Erro interno do servidor: " + error.message },
      { status: 500 }
    );
  }
}