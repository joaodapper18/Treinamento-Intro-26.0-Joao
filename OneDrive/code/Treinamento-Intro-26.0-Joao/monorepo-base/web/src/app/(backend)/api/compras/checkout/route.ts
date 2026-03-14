import { NextResponse } from "next/server";
import { MathService } from "@/services/mathService";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
 
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
      return NextResponse.json({ error: "Você precisa estar logado para comprar!" }, { status: 401 });
    }


    const body = await req.json();

    if (!body.produtoIds || body.produtoIds.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio!" }, { status: 400 });
    }


    const compra = await MathService.checkout(session.user.id, body.produtoIds);

    return NextResponse.json(compra, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao processar compra" }, { status: 500 });
  }
}