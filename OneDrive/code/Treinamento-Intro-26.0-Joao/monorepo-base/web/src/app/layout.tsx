import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: 'MathStore',
  description: 'A melhor loja de sinais matemáticos',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22 fill=%22%23db2777%22 font-family=%22monospace%22 font-weight=%22bold%22>x.x</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}