import prisma from "./prisma";
import * as trpcNext from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";
import { inferAsyncReturnType } from "@trpc/server";
import { Authorization } from "./Authorization";

export const createContext = async ({
  req,
  res
}: trpcNext.CreateNextContextOptions) => {
  let auth = new Authorization(prisma);
  await auth.init(await getSession({ req }));
  return {
    req,
    res,
    prisma,
    auth
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
