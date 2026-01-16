// In middleware.js or middleware.ts at the root of your project
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Jika tidak ada token dan bukan di /login, redirect ke /login
  if (!token && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika ada token, validasi JWT
  if (token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      // Token valid, lanjutkan
      return NextResponse.next();
    } catch (err) {
      // Token tidak valid, redirect ke /login
      if (!request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  // Untuk halaman /login, lanjutkan
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|public).*)"],
};
