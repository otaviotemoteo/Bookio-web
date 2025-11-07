import { NextRequest, NextResponse } from "next/server";
import { bookService } from "../../../../lib/services/book";

// GET /api/books/:bookId - Buscar livro por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const book = await bookService.getBook(params.bookId);

    if (!book) {
      return NextResponse.json(
        { message: "Livro não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ book });
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
    const formData = await req.formData();
    const dataString = formData.get("data") as string | null;
    const image = formData.get("image") as File | null;

    let data = {};
    if (dataString) {
      data = JSON.parse(dataString);
    }

    const result = await bookService.updateBook(
      params.bookId,
      data,
      image ?? undefined
    );

    return NextResponse.json({ book: result });
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
    await bookService.deleteBook(params.bookId);
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao deletar livro" },
      { status: error.status || 500 }
    );
  }
}
