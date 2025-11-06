import { NextRequest, NextResponse } from "next/server";
import { BookService } from "../../../lib/services/book";

const bookService = new BookService();

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

    const data = JSON.parse(dataString);
    const result = await bookService.createBook(data, image);

    return NextResponse.json({ book: result }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao criar livro" },
      { status: error.status || 500 }
    );
  }
}
