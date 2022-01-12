import { graphqlHTTP } from "express-graphql";
import { getSession } from "next-auth/react";
import prisma from "@/libs/prisma";
import { initializePermissions, can } from "@/libs/can";
import schema from "@/nexus/index";
export const config = {
  api: {
    bodyParser: false
  }
};

/** @type {import("next").NextApiHandler} */
export default async function handler(req, res) {
  const session = await getSession({ req });
  /** @type {import("global").ContextTypeObject} */
  let context = {
    req,
    res,
    session,
    prisma,
    can
  }
  await initializePermissions(session?.user?.role)
  const middleware = graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== "production",
    context
  });
  if (process.env.NODE_ENV === "production" && req.method === "GET")
    return res.json({ msg: "Welcome to graphql server" });
  if (req.method === "OPTIONS") return res.end();
  return middleware(req, res);
}
