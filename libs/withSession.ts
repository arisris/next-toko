import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { restAsyncHandler } from "./utils";

export const withSession = (handler: NextApiHandler) => restAsyncHandler(async (req, res) => {
  const session = await getSession({ req });
  req.session = session;
  req.user = session?.user;
  return handler(req, res);
})