import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params;

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`;
    console.log("📤 GET /books/:id:", apiUrl);

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
        { error: data.message || "Livro não encontrado" },
        { status: response.status }
      );
    }

    console.log("✅ Livro encontrado!");
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
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params;
    const formData = await request.formData();
    
    // Campo "data" é OPCIONAL no PUT
    const dataString = formData.get("data") as string;
    
    const backendFormData = new FormData();
    
    // Só adiciona "data" se existir
    if (dataString) {
      backendFormData.append("data", dataString);
    }

    // Adiciona image se existir
    const imageFile = formData.get("image");
    if (imageFile && imageFile instanceof File) {
      backendFormData.append("image", imageFile);
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`;
    console.log("📤 PUT /books/:id:", apiUrl);

    const token = cookies().get("token")?.value;

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
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
          error: data.message || "Erro ao atualizar livro",
          details: data
        },
        { status: response.status }
      );
    }

    console.log("✅ Livro atualizado com sucesso!");
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("❌ ERRO NO SERVIDOR:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor: " + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params;

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`;
    console.log("📤 DELETE /books/:id:", apiUrl);

    const token = cookies().get("token")?.value;

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const textBody = await response.text();
      let data;
      
      try {
        data = textBody ? JSON.parse(textBody) : {};
      } catch (parseError) {
        return NextResponse.json(
          { error: "Erro ao deletar livro" },
          { status: response.status }
        );
      }

      console.error("❌ Erro da API:", data);
      return NextResponse.json(
        { error: data.message || "Erro ao deletar livro" },
        { status: response.status }
      );
    }

    console.log("✅ Livro deletado com sucesso!");
    
    return NextResponse.json(
      { message: "Livro deletado com sucesso" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ ERRO NO SERVIDOR:", error);
    return NextResponse.json(
      { error: "Erro interno: " + error.message },
      { status: 500 }
    );
  }
}