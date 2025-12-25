import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const stats = await prisma.stats.findMany();
  return Response.json(stats);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const stat = await prisma.stats.create({ data });
  return Response.json(stat);
}
