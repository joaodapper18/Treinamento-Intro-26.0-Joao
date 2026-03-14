import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { 
  blockForbiddenRequests, 
  getUserFromRequest, 
  returnInvalidDataErrors, 
  validBody, 
  zodErrorHandler 
} from "@/utils/api";
import { AllowedRoutes } from "@/types";
import { idSchema, patchSchema } from "@/backend/schemas";
import { toErrorMessage } from "@/utils/api/toErrorMessage";

const allowedRoles: AllowedRoutes = {
  PATCH: ['SUPER_ADMIN', 'ADMIN', 'USER'],
  DELETE: ['SUPER_ADMIN', 'ADMIN', 'USER']
}


export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado no banco" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json({ error: "ID em formato incompatível ou erro de banco" }, { status: 400 });
  }
}


export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const forbidden = await blockForbiddenRequests(request, allowedRoles.PATCH);
    if (forbidden) return forbidden;

    const userFromRequest = await getUserFromRequest(request);
    if (userFromRequest instanceof NextResponse) return userFromRequest;

    const { id } = await params;
    if (userFromRequest.role === 'USER' && id !== userFromRequest.id) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const body = await validBody(request);
    const validationResult = patchSchema.safeParse(body);
    if (!validationResult.success) return returnInvalidDataErrors(validationResult.error);
    
    const user = await db.user.update({ where: { id }, data: validationResult.data });
    return NextResponse.json(user);
  } catch (error) {
    return zodErrorHandler(error);
  }
}


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const forbidden = await blockForbiddenRequests(request, allowedRoles.DELETE);
    if (forbidden) return forbidden;

    const { id } = await params;
    await db.user.delete({ where: { id } });
    return NextResponse.json({ message: "Usuário deletado" });
  } catch (error) {
    return zodErrorHandler(error);
  }
}