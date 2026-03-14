import { NextResponse } from "next/server";
import { MathService } from "@/services/mathService";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    
    const session = await auth.api.getSession({ headers: req.headers });
    const body = await req.json();

  
    const finalUserId = session?.user?.id || body.userId;

    if (!finalUserId) {
      return NextResponse.json(
        { error: "Você precisa estar logado para finalizar a compra!" }, 
        { status: 401 }
      );
    }

    if (!body.produtoIds || body.produtoIds.length === 0) {
      return NextResponse.json(
        { error: "O seu carrinho está vazio!" }, 
        { status: 400 }
      );
    }

    
    const compra = await MathService.checkout(finalUserId, body.produtoIds);

 
    return NextResponse.json(compra, { status: 201 });

  } catch (error) {
    console.error("Erro no Checkout Route:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar a compra." }, 
      { status: 500 }
    );
  }
}