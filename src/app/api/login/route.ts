import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // simpan di .env

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Cari user di database
  const user = await prisma.users.findUnique({ where: { email } });

  // Validasi user dan password (contoh: plain, sebaiknya hash)
  if (!user || user.password !== password) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  // Buat JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // Set cookie HttpOnly
  return NextResponse.json(
    { message: "Login success" },
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
      },
    }
  );
}
