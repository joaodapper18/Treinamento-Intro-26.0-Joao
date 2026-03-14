import { db } from "@/lib/db";

export const MathService = {
 
  async getProdutos() {
    return await db.produto.findMany({ 
      include: { categorias: true } 
    });
  },


  async getProdutoById(id: string) {
    return await db.produto.findUnique({
      where: { id },
      include: { categorias: true }
    });
  },


  async checkout(userId: string, produtoIds: string[]) {
   
    const produtosNoBanco = await db.produto.findMany({
      where: { id: { in: produtoIds } }
    });

   
    const precoTotal = produtoIds.reduce((acc, id) => {
      const produto = produtosNoBanco.find((p) => p.id === id);
      return acc + (produto?.preco || 0);
    }, 0);

  
    return await db.compra.create({
      data: {
        precoTotal,
        userId: userId, 
        produtos: {
          connect: produtoIds.map(id => ({ id })) 
        }
      }
    });
  },


  async getUserStats(userId: string) {
    const compras = await db.compra.findMany({
      where: { userId },
      include: { produtos: true }
    });

    const totalGasto = compras.reduce((acc, compra) => acc + compra.precoTotal, 0);
    const totalCompras = compras.length;

 
    const contagemProdutos: Record<string, number> = {};
    compras.forEach(compra => {
      compra.produtos.forEach(p => {
        contagemProdutos[p.nome] = (contagemProdutos[p.nome] || 0) + 1;
      });
    });

    const produtoMaisComprado = Object.entries(contagemProdutos)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || "Nenhum";

    return {
      totalGasto,
      totalCompras,
      produtoMaisComprado
    };
  }
};