import { NextRequest, NextResponse } from "next/server";
import { penaltyService } from "../../../../lib/services/penalty";

// GET /api/penalties/:penalityId - Buscar multa por ID
// Nota: A API usa "penalityId" (com typo) no path
export async function GET(
  req: NextRequest,
  { params }: { params: { penalityId: string } }
) {
  try {
    const penalty = await penaltyService.getPenalty(params.penalityId);

    if (!penalty) {
      return NextResponse.json(
        { message: "Multa não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ penality: penalty });
  } catch (error: any) {
    console.error("Error fetching penalty:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao buscar multa" },
      { status: error.status || 500 }
    );
  }
}
