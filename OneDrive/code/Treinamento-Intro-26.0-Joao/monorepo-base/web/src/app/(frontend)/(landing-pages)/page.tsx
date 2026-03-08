'use client'; 
import { useEffect, useState } from 'react';
import InitialNav from '../../../components/base/nav/InitialNav';
import ProdutoCard from '../../../components/ProdutoCard';

export default function MathStoreHome() {
  const [busca, setBusca] = useState('');

  const produtos = [
    { nome: "Sinal de Adição (+)", preco: 49.99, descricao: "Bom para ocupar espaço na folha." },
    { nome: "Sinal de Subtração (-)", preco: 24.99, descricao: "Quando temos que chutar valores na P3." },
    { nome: "Sinal de Divisão (/)", preco: 99.99, descricao: "Ajuda a não fazer conta quebrada." },
    { nome: "Sinal de Igual (=)", preco: 0.00, descricao: "Nunca usado em semana de provas." }
  ];

  useEffect(() => {
    localStorage.setItem('usuario_logado', 'Politécnico(a)');
  }, []);

  const produtosFiltrados = produtos.filter(p => 
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <InitialNav isLogged={true} /> 

      <main style={{ padding: '20px', backgroundColor: '#121212', minHeight: '100vh' }}>
        <h1 style={{ color: '#fff', textAlign: 'center', marginBottom: '10px' }}>
          Loja de Sinais Matemáticos
        </h1>

        {}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <input 
            type="text"
            placeholder="Buscar sinal por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              padding: '12px 25px',
              borderRadius: '25px',
              border: '2px solid #ff3399', 
              width: '100%',
              maxWidth: '400px',
              fontSize: '16px',
              backgroundColor: '#ffffff', 
              color: '#000000', 
              outline: 'none'
            }}
          />
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          {produtosFiltrados.map((produto, index) => (
            <ProdutoCard 
              key={index}
              nome={produto.nome} 
              preco={produto.preco} 
              descricao={produto.descricao} 
            />
          ))}
        </div>

        {produtosFiltrados.length === 0 && (
          <p style={{ color: '#fff', textAlign: 'center', marginTop: '20px' }}>
            Nenhum sinal encontrado para "{busca}"
          </p>
        )}
      </main>
    </>
  );
}