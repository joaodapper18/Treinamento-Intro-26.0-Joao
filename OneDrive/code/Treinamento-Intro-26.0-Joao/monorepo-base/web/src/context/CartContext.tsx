'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartContextType {
  itens: CartItem[];
  adicionarAoCarrinho: (produto: any) => void;
  removerDoCarrinho: (id: string) => void;
  valorTotal: number;
  quantidadeTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<CartItem[]>([]);

  const adicionarAoCarrinho = (produto: any) => {
    setItens(prev => {
      const existe = prev.find(item => item.id === produto.nome);
      if (existe) {
        return prev.map(item => 
          item.id === produto.nome ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { id: produto.nome, nome: produto.nome, preco: produto.preco, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id: string) => {
    setItens(prev => {
      const itemExistente = prev.find(item => item.id === id);
      if (itemExistente && itemExistente.quantidade > 1) {
        return prev.map(item =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        );
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const valorTotal = itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const quantidadeTotal = itens.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CartContext.Provider value={{ itens, adicionarAoCarrinho, removerDoCarrinho, valorTotal, quantidadeTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
};