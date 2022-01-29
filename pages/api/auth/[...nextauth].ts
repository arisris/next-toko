import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/server/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [
      Github({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      })
    ],
    callbacks: {
      async session({ session, token, user }) {
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        return token;
      }
    },
    secret: process.env.APP_SECRET_KEY
  });
}
