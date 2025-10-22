import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const dataString = formData.get("data") as string;
    if (!dataString) {
      return NextResponse.json(
        { error: "Campo 'data' é obrigatório" },
        { status: 400 }
      );
    }

    let jsonData;
    try {
      jsonData = JSON.parse(dataString);
    } catch (parseError) {
      return NextResponse.json(
        { error: "Formato JSON inválido no campo 'data'" },
        { status: 400 }
      );
    }

    const backendFormData = new FormData();
    backendFormData.append("data", dataString);

    const pictureFile = formData.get("picture");
    if (pictureFile && pictureFile instanceof File) {
      backendFormData.append("picture", pictureFile);
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/reader`;
    console.log("📤 POST /reader:", apiUrl);

    const token = request.headers.get("authorization");

    const response = await fetch(apiUrl, {
      method: "POST",
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
      console.log("Resposta recebida não é JSON válido:", textBody);

      return NextResponse.json(
        {
          error: "API externa retornou resposta inválida",
          details: textBody.slice(0, 200),
        },
        { status: 500 }
      );
    }

    if (!response.ok) {
      console.error("❌ Erro da API externa:", data);
      return NextResponse.json(
        {
          error:
            data.message || data.detail || data.error || "Erro ao criar leitor",
          details: data,
        },
        { status: response.status }
      );
    }

    console.log("✅ Leitor criado com sucesso!");
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
