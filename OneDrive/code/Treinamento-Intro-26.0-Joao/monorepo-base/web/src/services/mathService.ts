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


  async createProduto(data: { nome: string; preco: number; descricao: string }) {
    return await db.produto.create({ 
      data: {
        nome: data.nome,
        preco: data.preco,
        descricao: data.descricao
      }
    });
  },


  async updateProduto(id: string, data: { nome?: string; preco?: number; descricao?: string }) {
    return await db.produto.update({
      where: { id },
      data
    });
  },


  async deleteProduto(id: string) {
    return await db.produto.delete({
      where: { id }
    });
  },


  async checkout(userId: string, produtoIds: string[]) {
    const produtosEncontrados = await db.produto.findMany({
      where: {
        id: { in: produtoIds }
      }
    });

    const precoTotal = produtosEncontrados.reduce((acc, p) => acc + p.preco, 0);

    return await db.compra.create({
      data: {
        precoTotal,
        user: {
          connect: { id: userId }
        },
        produtos: {
          connect: produtoIds.map(id => ({ id }))
        }
      }
    });
  }
};