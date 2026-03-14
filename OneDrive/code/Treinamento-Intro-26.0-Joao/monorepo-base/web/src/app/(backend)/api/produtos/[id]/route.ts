import { NextResponse } from "next/server";
import { MathService } from "@/services/mathService";


export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const produto = await MathService.getProdutoById(params.id);
    if (!produto) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }
    return NextResponse.json(produto);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const produtoAtualizado = await MathService.updateProduto(params.id, body);
    return NextResponse.json(produtoAtualizado);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 400 });
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await MathService.deleteProduto(params.id);
    return NextResponse.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 400 });
  }
}