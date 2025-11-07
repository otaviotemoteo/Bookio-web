import { NextRequest, NextResponse } from "next/server";
import { penaltyService } from "../../../../../lib/services/penalty";

// PATCH /api/penalties/:penalityId/pay - Pagar multa
export async function PATCH(
  req: NextRequest,
  { params }: { params: { penalityId: string } }
) {
  try {
    const penalty = await penaltyService.payPenalty(params.penalityId);

    if (!penalty) {
      return NextResponse.json(
        { message: "Multa não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ penality: penalty });
  } catch (error: any) {
    console.error("Error paying penalty:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao pagar multa" },
      { status: error.status || 500 }
    );
  }
}
