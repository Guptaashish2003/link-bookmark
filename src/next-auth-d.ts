// import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
// import { User } from "@prisma/client";

 declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
    };
  }
}

declare module "next-auth" {
//   interface Session {
//     user: ExtendedUser;
//   }
    interface NextAuthOptions {
    trustHost?: boolean;
  }
}