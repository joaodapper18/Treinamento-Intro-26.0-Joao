'use client';
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Plus, Minus } from "lucide-react";

interface ProdutoProps {
  nome: string;
  preco: number;
  descricao: string;
}

export default function ProdutoCard({ nome, preco, descricao }: ProdutoProps) {
  const { adicionarAoCarrinho, removerDoCarrinho } = useCart();
  const [quantidadeLocal, setQuantidadeLocal] = useState(1);

  const handleAdicionar = () => {
    for (let i = 0; i < quantidadeLocal; i++) {
      adicionarAoCarrinho({ nome, preco });
    }
    setQuantidadeLocal(1);
  }; 

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{nome}</h2>
      <p className="text-gray-600 text-sm mb-4">{descricao}</p>
      <span className="text-2xl font-black text-black mb-6">R$ {preco.toFixed(2)}</span>

      {}
      <div className="flex items-center gap-4 mb-6 bg-gray-50 p-2 rounded-lg border">
        <button 
          onClick={() => setQuantidadeLocal(prev => Math.max(1, prev - 1))}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors text-black"
        >
          <Minus size={20} />
        </button>
        
        <span className="font-bold text-lg text-black w-8">{quantidadeLocal}</span>
        
        <button 
          onClick={() => setQuantidadeLocal(prev => prev + 1)}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors text-black"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex gap-2 w-full">
        <button 
          onClick={handleAdicionar}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Adicionar
        </button>
        <button 
          onClick={() => removerDoCarrinho(nome)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Remover
        </button>
      </div>
    </div>
  );
}