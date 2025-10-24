import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("🚪 Fazendo logout...");
    
    cookies().delete("token");
    
    console.log("✅ Logout realizado com sucesso!");
    
    return NextResponse.json({
      success: true,
      message: "Logout realizado com sucesso",
    });
  } catch (error: any) {
    console.error("❌ Erro no logout:", error);
    return NextResponse.json(
      { error: "Erro ao fazer logout: " + error.message },
      { status: 500 }
    );
  }
}