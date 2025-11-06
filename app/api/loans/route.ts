import { NextRequest, NextResponse } from "next/server";
import { LoanService } from "@/services/loan-service";
import { CreateLoanRequest } from "@/types";

const loanService = new LoanService();

// POST /api/loans - Criar empréstimo
export async function POST(req: NextRequest) {
  try {
    const body: CreateLoanRequest = await req.json();

    if (!body.bookId || !body.readerId || !body.returnDate) {
      return NextResponse.json(
        { message: "Campos obrigatórios: bookId, readerId, returnDate" },
        { status: 400 }
      );
    }

    const loan = await loanService.createLoan(body);

    return NextResponse.json({ loan }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating loan:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao criar empréstimo" },
      { status: error.status || 500 }
    );
  }
}

// GET /api/loans - Listar todos os empréstimos
export async function GET(req: NextRequest) {
  try {
    const loans = await loanService.getAllLoans();
    return NextResponse.json({ loans });
  } catch (error: any) {
    console.error("Error fetching loans:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao buscar empréstimos" },
      { status: error.status || 500 }
    );
  }
}
