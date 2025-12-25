import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.users.findUnique({ where: { id: params.id } });
  return Response.json(user);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const user = await prisma.users.update({ where: { id: params.id }, data });
  return Response.json(user);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.users.delete({ where: { id: params.id } });
  return Response.json({ success: true });
}
