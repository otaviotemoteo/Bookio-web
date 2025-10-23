import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { readerId: string } }
) {
  try {
    const { readerId } = params;

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/reader/${readerId}`;
    console.log("📤 GET /reader/:id:", apiUrl);

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
        { error: "API externa retornou resposta inválida" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      console.error("❌ Erro da API:", data);
      return NextResponse.json(
        { error: data.message || "Leitor não encontrado" },
        { status: response.status }
      );
    }

    console.log("✅ Leitor encontrado!");
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ ERRO NO SERVIDOR:", error);
    return NextResponse.json(
      { error: "Erro interno: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { readerId: string } }
) {
  try {
    const { readerId } = params;
    
    const formData = await request.formData();
    
    const dataString = formData.get("data") as string;
    
    const backendFormData = new FormData();
    
    if (dataString) {
      backendFormData.append("data", dataString);
    }

    const pictureFile = formData.get("picture");
    if (pictureFile && pictureFile instanceof File) {
      backendFormData.append("picture", pictureFile);
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/reader/${readerId}`;
    console.log("📤 PUT /reader/:id:", apiUrl);

    const token = request.headers.get("authorization");

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        ...(token && { Authorization: token }),
      },
      body: backendFormData,
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
          details: textBody.slice(0, 200)
        },
        { status: 500 }
      );
    }

    if (!response.ok) {
      console.error("❌ Erro da API:", data);
      return NextResponse.json(
        { 
          error: data.message || "Erro ao atualizar leitor",
          details: data
        },
        { status: response.status }
      );
    }

    console.log("✅ Leitor atualizado com sucesso!");
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("❌ ERRO NO SERVIDOR:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor: " + error.message },
      { status: 500 }
    );
  }
}