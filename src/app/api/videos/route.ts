import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const videos = await prisma.videos.findMany();
  return Response.json(videos);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const video = await prisma.videos.create({ data });
  return Response.json(video);
}
