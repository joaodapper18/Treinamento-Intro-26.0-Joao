import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}


export async function GET(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const produto = await db.produto.findUnique({
      where: { id },
      include: { categorias: true }
    });

    if (!produto) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    return NextResponse.json(produto);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar" }, { status: 500 });
  }
}


export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json();

    const atualizado = await db.produto.update({
      where: { id },
      data: {
        nome: body.nome,
        descricao: body.descricao,
        preco: body.preco ? Number(body.preco) : undefined
      }
    });

    return NextResponse.json(atualizado);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 400 });
  }
}


export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await db.produto.delete({ where: { id } });
    return NextResponse.json({ message: "Deletado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 400 });
  }
}