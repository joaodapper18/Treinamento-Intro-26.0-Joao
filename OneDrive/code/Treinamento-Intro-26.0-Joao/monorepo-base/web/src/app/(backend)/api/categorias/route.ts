import { NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function POST(req: Request) {
  try {
    const { nome } = await req.json();
    const novaCategoria = await db.categoria.create({
      data: { nome }
    });
    return NextResponse.json(novaCategoria, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar categoria" }, { status: 400 });
  }
}


export async function GET() {
  const categorias = await db.categoria.findMany({
    include: { produtos: true }
  });
  return NextResponse.json(categorias);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { nome } = await req.json();
    const atualizada = await db.categoria.update({
      where: { id: params.id },
      data: { nome }
    });
    return NextResponse.json(atualizada);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar categoria" }, { status: 400 });
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.categoria.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ message: "Categoria deletada!" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar categoria" }, { status: 400 });
  }
}