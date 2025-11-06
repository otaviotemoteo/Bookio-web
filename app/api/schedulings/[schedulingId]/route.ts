import { NextRequest, NextResponse } from "next/server";
import { SchedulingService } from "@/services/scheduling-service";

const schedulingService = new SchedulingService();

// GET /api/schedulings/:schedulingId - Buscar agendamento por ID
export async function GET(
  req: NextRequest,
  { params }: { params: { schedulingId: string } }
) {
  try {
    const scheduling = await schedulingService.getSchedulingById(
      params.schedulingId
    );

    if (!scheduling) {
      return NextResponse.json(
        { message: "Agendamento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ scheduling });
  } catch (error: any) {
    console.error("Error fetching scheduling:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao buscar agendamento" },
      { status: error.status || 500 }
    );
  }
}

// DELETE /api/schedulings/:schedulingId - Cancelar agendamento
export async function DELETE(
  req: NextRequest,
  { params }: { params: { schedulingId: string } }
) {
  try {
    await schedulingService.deleteScheduling(params.schedulingId);
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting scheduling:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao cancelar agendamento" },
      { status: error.status || 500 }
    );
  }
}
