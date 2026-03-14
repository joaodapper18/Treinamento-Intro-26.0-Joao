import { NextResponse } from "next/server";
import { MathService } from "@/services/mathService";

export async function GET() {
  try {
    const produtos = await MathService.getProdutos();
    return NextResponse.json(produtos);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const novoProduto = await MathService.createProduto(body);
    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 400 });
  }
}