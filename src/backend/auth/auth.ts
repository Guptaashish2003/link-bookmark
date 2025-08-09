import NextAuth from "next-auth";
import authConfig from "@/backend/auth/auth.config";

const handler = NextAuth(authConfig);

export default handler;