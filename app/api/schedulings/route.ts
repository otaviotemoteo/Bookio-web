import { NextRequest, NextResponse } from "next/server";
import { schedulingService } from "../../../lib/services/scheduling";
import { CreateSchedulingRequest } from "../../../types/scheduling";

// POST /api/schedulings - Criar agendamento
export async function POST(req: NextRequest) {
  try {
    const body: CreateSchedulingRequest = await req.json();

    if (!body.readerId || !body.bookId) {
      return NextResponse.json(
        { message: "Campos obrigatórios: readerId, bookId" },
        { status: 400 }
      );
    }

    const scheduling = await schedulingService.createScheduling(body);

    return NextResponse.json({ scheduling }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating scheduling:", error);
    return NextResponse.json(
      { message: error.message || "Erro ao criar agendamento" },
      { status: error.status || 500 }
    );
  }
}
