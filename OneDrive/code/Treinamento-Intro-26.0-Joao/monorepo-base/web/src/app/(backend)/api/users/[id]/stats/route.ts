import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
   
    const { id } = await params;

    const user = await db.user.findUnique({
      where: { id: id },
      select: { name: true }
    });

    const compras = await db.compra.findMany({
      where: { userId: id },
      include: { produtos: true }
    });

    const totalGasto = compras.reduce((acc, c) => acc + c.precoTotal, 0);

    const contagemProdutos: Record<string, { nome: string; qtd: number }> = {};
    compras.forEach((compra) => {
      compra.produtos.forEach((produto) => {
        if (!contagemProdutos[produto.id]) {
          contagemProdutos[produto.id] = { nome: produto.nome, qtd: 0 };
        }
        contagemProdutos[produto.id].qtd += 1;
      });
    });

    const produtosOrdenados = Object.values(contagemProdutos).sort((a, b) => b.qtd - a.qtd);
    const produtoMaisComprado = produtosOrdenados.length > 0 ? produtosOrdenados[0].nome : "Nenhum";

    return NextResponse.json({
      nomeUsuario: user?.name || "Usuário não encontrado",
      quantidadeCompras: compras.length,
      gastoTotal: totalGasto,
      produtoMaisComprado: produtoMaisComprado,
      moeda: "R$",
      status: totalGasto > 500 ? "Cliente VIP" : totalGasto > 0 ? "Cliente Ativo" : "Novo Usuário"
    });

  } catch (error) {
    console.error("Erro na rota de stats:", error);
    return NextResponse.json({ error: "Erro ao calcular estatísticas" }, { status: 500 });
  }
}