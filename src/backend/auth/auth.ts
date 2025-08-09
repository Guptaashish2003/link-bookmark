import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers:{ GET, POST }, auth, signIn, signOut } = NextAuth(authConfig);

// Optional: export GET and POST here if you want to use them directly