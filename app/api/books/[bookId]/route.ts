import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Função helper para pegar o token
function getToken(): string | undefined {
  const cookieStore = cookies();
  return cookieStore.get("token")?.value;
}

// GET /api/books/:bookId - Buscar livro por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const token = getToken();

    if (!token) {
      return NextResponse.json(
        { message: "Token não encontrado. Faça login novamente." },
        { status: 401 }
      );
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/books/${params.bookId}`;
    console.log("📤 GET /books/:id da API externa:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Livro não encontrado",
      }));

      return NextResponse.json(
        { message: error.message },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ book: result.book });
  } catch (error: any) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao buscar livro" },
      { status: error.status || 500 }
    );
  }
}

// PUT /api/books/:bookId - Atualizar livro
export async function PUT(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const token = getToken();

    if (!token) {
      return NextResponse.json(
        { message: "Token não encontrado. Faça login novamente." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const dataString = formData.get("data") as string | null;
    const image = formData.get("image") as File | null;

    // Criar novo FormData para enviar para a API externa
    const externalFormData = new FormData();

    if (dataString) {
      externalFormData.append("data", dataString);
    }

    if (image) {
      externalFormData.append("image", image);
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/books/${params.bookId}`;
    console.log("📤 PUT /books/:id para API externa:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: externalFormData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Erro ao atualizar livro",
      }));

      return NextResponse.json(
        { message: error.message },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ book: result.book });
  } catch (error: any) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao atualizar livro" },
      { status: error.status || 500 }
    );
  }
}

// DELETE /api/books/:bookId - Deletar livro
export async function DELETE(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const token = getToken();

    if (!token) {
      return NextResponse.json(
        { message: "Token não encontrado. Faça login novamente." },
        { status: 401 }
      );
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/books/${params.bookId}`;
    console.log("📤 DELETE /books/:id para API externa:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Erro ao deletar livro",
      }));

      return NextResponse.json(
        { message: error.message },
        { status: response.status }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao deletar livro" },
      { status: error.status || 500 }
    );
  }
}
