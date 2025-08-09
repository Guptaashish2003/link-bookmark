import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { dataBasePrisma } from "@/databasePrisma";
import { compare } from "bcryptjs";

const authConfig: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GIT_CLIENT_ID!,
      clientSecret: process.env.GIT_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await dataBasePrisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Check password
        const isHashed = user.password?.startsWith("$2a$") || user.password?.startsWith("$2b$");
        let isValid = false;

        if (isHashed) {
          isValid = await compare(String(credentials.password), String(user.password));
        } else {
          // For dev/testing with plain text passwords
          isValid = credentials.password === user.password;
        }

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const existingUser = await dataBasePrisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await dataBasePrisma.user.create({
            data: {
              email: user.email!,
              name: user.name || "",
            },
          });
        }
      }
      return true;
    },
    async session({ session }) {
      if (session.user?.email) {
        const dbUser = await dataBasePrisma.user.findUnique({
          where: { email: session.user.email },
        });
        if (dbUser) {
          session.user.id = dbUser.id;
        }
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },

  session: { strategy: "jwt" },
};

export default authConfig;
