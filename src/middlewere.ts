import authConfig from "@/backend/auth/auth.config"
import NextAuth from "next-auth"
import { NextRequest, NextResponse } from "next/server";
const { auth } = NextAuth(authConfig);




export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}