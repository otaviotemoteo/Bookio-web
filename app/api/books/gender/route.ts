import { NextRequest, NextResponse } from "next/server";
import { BookService } from "@/services/book-service";
import { BookGender } from "../../../../types/index";

const bookService = new BookService();

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

    const books = await bookService.getBooksByGender(gender);
    return NextResponse.json({ books });
  } catch (error: any) {
    console.error("Error fetching books by gender:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao buscar livros por gênero" },
      { status: error.status || 500 }
    );
  }
}
