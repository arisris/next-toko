import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import prisma from "@/libs/prisma";
import isEmail from "validator/lib/isEmail";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

/** @type {import("next").NextApiHandler} */
export default async function handler(req, res) {
  return await NextAuth(req, res, {
    // in this case we not use db adapter to persist session
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email / Username",
            type: "text",
            placeholder: "Email or Username"
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "Password"
          }
        },
        async authorize({email, password}, req) {
          /** @type { Prisma.UsersWhereInput } */
          let where = {};
          if (isEmail(email)) {
            where.email = email;
          } else {
            where.username = email;
          }
          const user = await prisma.users.findFirst({ where });
          if (user?.password) {
            let matchedPassword = await bcrypt.compare(password, user.password);
            if (matchedPassword) {
              /** @type {import("next-auth").User} */
              let out = {
                id: user.id,
                name: user.username,
                email: user.email,
                image: user.photo
              };
              return out;
            }
          }
          return null;
        }
      })
    ],
    callbacks: {
      async session({ session, token, user }) {
        if (token?.userId && session.user) session.user.id = token.userId;
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (user?.id) token.userId = user.id;
        return token;
      }
    },
    secret: process.env.APP_SECRET_KEY
  });
}