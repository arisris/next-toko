import { graphqlHTTP } from "express-graphql";
import { getSession } from "next-auth/react";
import prisma from "@/libs/prisma";
import schema from "@/nexus/index";
import { ContextTypeObject } from "types/global";
import { NextApiRequest, NextApiResponse } from "next";
export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  let context: ContextTypeObject = {
    req,
    res,
    session,
    prisma
  }
  const middleware = graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== "production",
    context
  });
  if (process.env.NODE_ENV === "production" && req.method === "GET")
    return res.json({ msg: "Welcome to graphql server" });
  if (req.method === "OPTIONS") return res.end();
  // @ts-expect-error
  return middleware(req, res);
}
