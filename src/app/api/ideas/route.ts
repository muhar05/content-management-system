import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const ideas = await prisma.ideas.findMany();
  return Response.json(ideas);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const idea = await prisma.ideas.create({ data });
  return Response.json(idea);
}
