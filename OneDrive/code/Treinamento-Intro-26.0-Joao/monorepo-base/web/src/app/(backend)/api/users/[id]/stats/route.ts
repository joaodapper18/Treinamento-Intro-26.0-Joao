import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

    const compras = await db.compra.findMany({
      where: { 
        userId: userId 
      }
    });

    const totalGasto = compras.reduce((acc, c) => acc + c.precoTotal, 0);

    return NextResponse.json({
      nomeUsuario: "Politécnico", 
      quantidadeCompras: compras.length,
      gastoTotal: totalGasto,
      moeda: "R$",
      status: totalGasto > 0 ? "Cliente Ativo" : "Novo Usuário"
    });

  } catch (error) {
    console.error("Erro na rota de stats:", error);
    return NextResponse.json(
      { error: "Erro ao calcular estatísticas" }, 
      { status: 500 }
    );
  }
}