"use client";

import { useState, useEffect } from "react";

export default function PerfilPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  const userId = "qQxGzPqvbvLjGYYNKFdtkmQq4TbyIqRK"; 

  useEffect(() => {
    fetch(`/api/users/${userId}/stats`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Carregando estatísticas...</div>;
  if (!stats) return <div className="p-8 text-center text-red-500">Erro ao carregar dados.</div>;

  return (
    <main className="min-h-screen bg-slate-50 p-8 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg shadow-blue-200">
            {stats.nomeUsuario?.charAt(0)}
          </div>
          <h1 className="text-2xl font-black text-slate-900">{stats.nomeUsuario}</h1>
          <span className={`inline-block mt-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            stats.status === "Cliente VIP" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
          }`}>
            {stats.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 p-4 rounded-3xl text-center">
            <p className="text-slate-400 text-xs mb-1 uppercase font-bold tracking-tighter">Compras</p>
            <p className="text-2xl font-black text-slate-900">{stats.quantidadeCompras}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-3xl text-center">
            <p className="text-slate-400 text-xs mb-1 uppercase font-bold tracking-tighter">Total Gasto</p>
            <p className="text-2xl font-black text-slate-900">{stats.moeda} {stats.gastoTotal.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="text-2xl">🔥</div>
            <div>
              <p className="text-blue-900/60 text-xs font-bold uppercase">Produto Favorito</p>
              <p className="text-blue-900 font-black text-lg">{stats.produtoMaisComprado}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => window.location.href = "/"}
          className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95"
        >
          Voltar para a Loja
        </button>
      </div>
    </main>
  );
}