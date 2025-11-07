import { NextRequest, NextResponse } from "next/server";
import { loanService } from "../../../../../lib/services/loan";

// GET /api/loans/:loanId/status - Verificar status do empréstimo
export async function GET(
  req: NextRequest,
  { params }: { params: { loanId: string } }
) {
  try {
    const status = await loanService.getLoanStatus(params.loanId);

    if (!status) {
      return NextResponse.json(
        { message: "Empréstimo não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(status);
  } catch (error: any) {
    console.error("Error fetching loan status:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao verificar status do empréstimo" },
      { status: error.status || 500 }
    );
  }
}
