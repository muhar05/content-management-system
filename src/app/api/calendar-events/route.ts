import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const events = await prisma.calendar_events.findMany();
  return Response.json(events);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const event = await prisma.calendar_events.create({ data });
  return Response.json(event);
}
