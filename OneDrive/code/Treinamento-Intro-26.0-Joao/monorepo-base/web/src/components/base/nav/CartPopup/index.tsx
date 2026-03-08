'use client';
import { useCart } from "@/context/CartContext";
import { Trash2, X } from "lucide-react";

export default function CartPopup({ onClose }: { onClose: () => void }) {
  const { itens, valorTotal, removerDoCarrinho } = useCart();

  return (
    <div className="absolute right-0 top-16 w-80 bg-white shadow-2xl rounded-xl border border-gray-200 z-50 p-4">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h3 className="font-bold text-pink-600">Meus Sinais</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-black">
          <X size={20} />
        </button>
      </div>

      {itens.length === 0 ? (
        <p className="text-center text-gray-500 py-4">Carrinho vazio x.x</p>
      ) : (
        <div className="max-h-60 overflow-y-auto">
          {itens.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-3 text-sm">
              <div className="flex flex-col">
                <span className="font-semibold text-black">{item.nome}</span>
                <span className="text-gray-500">{item.quantidade}x R$ {item.preco.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => removerDoCarrinho(item.id)}
                className="text-red-500 hover:bg-red-50 p-1 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between font-bold text-lg text-black">
          <span>Total:</span>
          <span>R$ {valorTotal.toFixed(2)}</span>
        </div>
        <button className="w-full bg-pink-500 text-white py-2 rounded-lg mt-4 font-bold hover:bg-pink-600 transition-colors">
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}