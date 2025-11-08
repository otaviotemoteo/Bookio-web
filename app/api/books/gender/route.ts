import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BookGender } from "../../../../types/book";

const validGenders: BookGender[] = [
  "Fiction",
  "NonFiction",
  "Fantasy",
  "ScienceFiction",
  "Mystery",
  "Romance",
  "Thriller",
  "Horror",
  "Biography",
  "History",
  "Poetry",
  "SelfHelp",
];

// GET /api/books/gender/:gender - Buscar livros por gênero
export async function GET(
  req: NextRequest,
  { params }: { params: { gender: string } }
) {
  try {
    const gender = params.gender as BookGender;

    if (!validGenders.includes(gender)) {
      return NextResponse.json({ message: "Gênero inválido" }, { status: 400 });
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

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/books/gender/${gender}`;
    console.log("📤 GET /books/gender/:gender da API externa:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Erro ao buscar livros por gênero",
      }));

      return NextResponse.json(
        { message: error.message },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ books: result.books });
  } catch (error: any) {
    console.error("Error fetching books by gender:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao buscar livros por gênero" },
      { status: error.status || 500 }
    );
  }
}
