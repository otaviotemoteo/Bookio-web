import { NextRequest, NextResponse } from "next/server";
import { PenaltyService } from "@/services/penalty-service";

const penaltyService = new PenaltyService();

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
