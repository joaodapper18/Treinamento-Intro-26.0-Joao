'use client'; 
import { useState } from "react";
import Link from "next/link";
import NavbarLogo from "../NavbarLogo";
import CartPopup from "../CartPopup";
import { UserRound, ShoppingCart } from "lucide-react"; 
import { useCart } from "@/context/CartContext";

function LandingPagesNav({ isLogged }: { isLogged: boolean }) {
  const { quantidadeTotal, valorTotal } = useCart();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const nomeUsuario = "Politécnico(a)";

  return ( 
    <nav className="w-full py-6 px-8 flex items-center justify-between bg-white border-b relative">
      <div className="text-pink-500">
        <NavbarLogo isH2 />
      </div>

      <div className="flex items-center gap-6">
        {}
        <div 
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          className="flex items-center gap-2 bg-pink-50 p-2 px-4 rounded-full border border-pink-200 cursor-pointer hover:bg-pink-100 transition-all"
        >
          <ShoppingCart className="text-pink-600 w-5 h-5" />
          <span className="text-sm font-medium text-pink-900">
            {quantidadeTotal} sinais | <strong>R$ {valorTotal.toFixed(2)}</strong>
          </span>
        </div>

        {}
        {isPopupOpen && <CartPopup onClose={() => setIsPopupOpen(false)} />}

        <ul className="flex items-center gap-4 text-xl">
          {isLogged ? (
            <li className="flex items-center gap-4">
              {}
              <span className="text-base font-semibold text-pink-700">
                Olá, {nomeUsuario}
              </span>
              <Link href='/aprender' className="button-md border-pink-200 text-pink-50 bg-pink-500 flex items-center gap-2">
                <UserRound /> Aprender
              </Link>
            </li>
          ) : (
            <>
              <li><Link href='/login' className="button-md text-pink-600">Entrar</Link></li>
              <li><Link href='/cadastro' className="button-md border-pink-200 text-pink-50 bg-pink-500">Cadastro</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default LandingPagesNav;