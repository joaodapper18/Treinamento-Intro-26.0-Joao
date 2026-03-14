import { NextResponse } from "next/server";
import { db } from "@/lib/db";
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

    if (!body.nome || !body.preco) {
      return NextResponse.json({ error: "Nome e preço são obrigatórios" }, { status: 400 });
    }

 
    const novoProduto = await db.produto.create({
      data: {
        nome: body.nome,
        descricao: body.descricao,
        preco: Number(body.preco), 
        categorias: body.categoriaIds ? {
          connect: body.categoriaIds.map((id: string) => ({ id }))
        } : undefined
      }
    });

    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 400 });
  }
}