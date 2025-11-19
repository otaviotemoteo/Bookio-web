import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: { schedulingId: string } }
) {
  try {
    const { schedulingId } = params;

    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/schedulings/${schedulingId}`;
    console.log("📤 GET /schedulings/:id:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const textBody = await response.text();
    let data;

    try {
      data = textBody ? JSON.parse(textBody) : {};
    } catch (parseError) {
      console.error("❌ Erro ao parsear JSON:", parseError);
      return NextResponse.json(
        {
          error: "API externa retornou resposta inválida",
          details: textBody.slice(0, 200),
        },
        { status: 500 }
      );
    }

    if (!response.ok) {
      console.error("❌ Erro da API:", data);
      return NextResponse.json(
        { error: data.message || "Erro ao buscar agendamento" },
        { status: response.status }
      );
    }

    console.log("✅ Agendamento encontrado com sucesso!");
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ ERRO NO SERVIDOR:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor: " + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { schedulingId: string } }
) {
  try {
    const { schedulingId } = params;

    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/schedulings/${schedulingId}`;
    console.log("📤 DELETE /schedulings/:id:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const textBody = await response.text();
      let data;

      try {
        data = textBody ? JSON.parse(textBody) : {};
      } catch (parseError) {
        console.error("❌ Erro ao parsear JSON:", parseError);
        return NextResponse.json(
          {
            error: "API externa retornou resposta inválida",
            details: textBody.slice(0, 200),
          },
          { status: 500 }
        );
      }

      console.error("❌ Erro da API:", data);
      return NextResponse.json(
        { error: data.message || "Erro ao cancelar agendamento" },
        { status: response.status }
      );
    }

    console.log("✅ Agendamento cancelado com sucesso!");
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("❌ ERRO NO SERVIDOR:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor: " + error.message },
      { status: 500 }
    );
  }
}
