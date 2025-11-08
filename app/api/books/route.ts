import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// POST /api/books - Criar novo livro
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const dataString = formData.get("data") as string;
    const image = formData.get("image") as File | null;

    if (!dataString) {
      return NextResponse.json(
        { message: "Campo 'data' é obrigatório" },
        { status: 400 }
      );
    }

    const parsedData = JSON.parse(dataString);

    // Reordenar campos na ordem da documentação
    const data = {
      libraryId: parsedData.libraryId,
      author: parsedData.author,
      title: parsedData.title,
      gender: parsedData.gender,
      year: parsedData.year,
      available: parsedData.available,
    };

    // Validar campos obrigatórios
    const requiredFields = [
      "libraryId",
      "author",
      "title",
      "gender",
      "year",
      "available",
    ];
    const missingFields = requiredFields.filter(
      (field) => !data[field as keyof typeof data]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: `Campos obrigatórios faltando: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Pegar o token do cookie
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Token não encontrado. Faça login novamente." },
        { status: 401 }
      );
    }

    // Criar FormData para enviar para a API externa
    const externalFormData = new FormData();
    externalFormData.append("data", JSON.stringify(data));

    if (image) {
      externalFormData.append("image", image);
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/books`;
    console.log("📤 POST /books:", data.title);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: externalFormData,
    });

    const textBody = await response.text();

    if (!response.ok) {
      console.error("❌ Erro da API externa:", textBody);

      let error;
      try {
        error = JSON.parse(textBody);
      } catch {
        error = { message: textBody || "Erro ao criar livro na API externa" };
      }

      return NextResponse.json(
        { message: error.message || error.error || "Erro ao criar livro" },
        { status: response.status }
      );
    }

    const result = JSON.parse(textBody);
    console.log("✅ Livro criado:", data.title);

    return NextResponse.json({ book: result.book }, { status: 201 });
  } catch (error: any) {
    console.error("❌ Erro no servidor:", error.message);

    return NextResponse.json(
      { message: error.message || "Erro ao criar livro" },
      { status: 500 }
    );
  }
}
