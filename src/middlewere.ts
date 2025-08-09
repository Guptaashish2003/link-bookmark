import authConfig from "@/backend/auth/auth.config"
import NextAuth from "next-auth"
const { auth } = NextAuth(authConfig);
console.log("Auth config loaded:", auth);




export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}