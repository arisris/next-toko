import { getSession } from "next-auth/react"

/** @type {import("next").NextApiHandler} */
export default async function handler(req, res) {
  const session = await getSession({ req });
  const msg = "Hello! Wellcome Back "+ (session?.user?.name || "Guest");
  res.json({
    msg
  })
}