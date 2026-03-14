"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [carrinho, setCarrinho] = useState<{ produto: any; qtd: number }[]>([]);

  useEffect(() => {
    fetch("/api/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data));
  }, []);

  const adicionarAoCarrinho = (produto: any) => {
    setCarrinho((prev) => {
      const itemExiste = prev.find((item) => item.produto.id === produto.id);
      if (itemExiste) {
        return prev.map((item) =>
          item.produto.id === produto.id ? { ...item, qtd: item.qtd + 1 } : item
        );
      }
      return [...prev, { produto, qtd: 1 }];
    });
  };

  const retirarDoCarrinho = (produtoId: string) => {
    setCarrinho((prev) => {
      const item = prev.find((i) => i.produto.id === produtoId);
      if (item && item.qtd > 1) {
        return prev.map((i) =>
          i.produto.id === produtoId ? { ...i, qtd: i.qtd - 1 } : i
        );
      }
      return prev.filter((i) => i.produto.id !== produtoId);
    });
  };

  const handleCheckout = async () => {
  if (carrinho.length === 0) return alert("Carrinho vazio!");

  const produtoIds = carrinho.flatMap((item) =>
    Array(item.qtd).fill(item.produto.id)
  );

  try {
    const response = await fetch("/api/compras/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       
        userId: "qQxGzPqvbvLjGYYNKFdtkmQq4TbyIqRK", 
        produtoIds: produtoIds,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Compra realizada com sucesso! 🎉");
      setCarrinho([]);
    } else {
      alert(`Erro: ${data.error || "Sessão inválida."}`);
    }
  } catch (error) {
    alert("Erro de conexão.");
  }
};

  const totalGasto = carrinho.reduce((acc, item) => acc + item.produto.preco * item.qtd, 0);

  return (
    <main className="p-8 bg-slate-50 min-h-screen flex flex-col md:flex-row gap-8 font-sans">
      <div className="flex-1">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 flex items-center gap-2">
            MathStore <span className="text-2xl">🧮</span>
          </h1>
          <p className="text-slate-500">A sua loja de ferramentas matemáticas.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-4">
                {p.nome.includes("Soma") ? "➕" : p.nome.includes("Subtração") ? "➖" : "🔢"}
              </div>
              <h2 className="text-xl font-bold text-slate-800">{p.nome}</h2>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2">{p.descricao}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900">R$ {p.preco.toFixed(2)}</span>
                <button
                  onClick={() => adicionarAoCarrinho(p)}
                  className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-blue-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {}
      <div className="w-full md:w-96 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 h-fit sticky top-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">🛒 Seu Carrinho</h2>
        
        {carrinho.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-400 italic">O carrinho está vazio</p>
          </div>
        ) : (
          <>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
              {carrinho.map((item) => (
                <div key={item.produto.id} className="flex items-center justify-between group">
                  <div>
                    <h3 className="font-bold text-slate-800">{item.produto.nome}</h3>
                    <p className="text-sm text-slate-400">R$ {item.produto.preco.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl">
                    <button onClick={() => retirarDoCarrinho(item.produto.id)} className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-red-500">-</button>
                    <span className="font-bold w-4 text-center">{item.qtd}</span>
                    <button onClick={() => adicionarAoCarrinho(item.produto)} className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-green-500">+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex justify-between items-end mb-6">
                <span className="text-slate-500 font-medium">Total do pedido</span>
                <span className="text-3xl font-black text-slate-900">R$ {totalGasto.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}