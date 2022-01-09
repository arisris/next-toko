import prisma from "@/libs/prisma";
import { graphqlHTTP } from "express-graphql";
import schema from "@/libs/graphql";
import { getSession } from "next-auth/react";
export const config = {
  api: {
    bodyParser: false
  }
};

/** @type {import("next").NextApiHandler} */
export default async function handler(req, res) {
  const session = await getSession({ req });
  const middleware = graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== "production",
    context: {
      req,
      res,
      session,
      prisma
    }
  });
  if (process.env.NODE_ENV === "production" && req.method === "GET")
    return res.json({ msg: "Welcome to graphql server" });
  if (req.method === "OPTIONS") return res.end();
  return middleware(req, res);
}
