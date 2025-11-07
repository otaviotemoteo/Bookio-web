import { NextRequest, NextResponse } from "next/server";
import { loanService } from "../../../../lib/services/loan";

// GET /api/loans/:loanId - Buscar empréstimo por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { loanId: string } }
) {
  try {
    const loan = await loanService.getLoan(params.loanId);

    if (!loan) {
      return NextResponse.json(
        { message: "Empréstimo não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ loan });
  } catch (error: any) {
    console.error("Error fetching loan:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao buscar empréstimo" },
      { status: error.status || 500 }
    );
  }
}

// DELETE /api/loans/:loanId - Deletar empréstimo
export async function DELETE(
  req: NextRequest,
  { params }: { params: { loanId: string } }
) {
  try {
    await loanService.deleteLoan(params.loanId);
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting loan:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao deletar empréstimo" },
      { status: error.status || 500 }
    );
  }
}
