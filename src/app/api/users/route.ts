import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.users.findMany();
  return Response.json(users);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const user = await prisma.users.create({ data });
  return Response.json(user);
}
