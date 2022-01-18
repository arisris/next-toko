import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const msg = "Hello! Wellcome Back "+ (session?.user?.name || "Guest");
  res.json({
    msg
  })
}