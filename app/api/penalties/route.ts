import { NextRequest, NextResponse } from "next/server";
import { penaltyService } from "../../../lib/services/penalty";
import { CreatePenaltyRequest } from "../../../types/penalty";

// POST /api/penalties - Criar multa
export async function POST(req: NextRequest) {
  try {
    const body: CreatePenaltyRequest = await req.json();

    if (!body.readerId || !body.loanId || !body.amount || !body.dueDate) {
      return NextResponse.json(
        { message: "Campos obrigatórios: readerId, loanId, amount, dueDate" },
        { status: 400 }
      );
    }

    if (body.amount <= 0) {
      return NextResponse.json(
        { message: "O valor da multa deve ser maior que zero" },
        { status: 400 }
      );
    }

    const penalty = await penaltyService.createPenalty(body);

    return NextResponse.json({ penality: penalty }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating penalty:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao criar multa" },
      { status: error.status || 500 }
    );
  }
}
