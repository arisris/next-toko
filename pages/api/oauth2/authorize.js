import { oauthAuthorize } from "@/libs/oauth2/server";

/**
 * @type { import("next").NextApiHandler }
 */
export default function handler(req, res) {
  if (req.method === "GET") {
    return res.send("Todo Views");
  } else if (req.method === "POST") {
    try {
      let token = await oauthAuthorize(req, res);
      return res.send(token);
    } catch(e) {
      return res.status(e.code).json(e);
    }
  } else {
    res.send(405).json({code: 405, message: "Invalid Method"})
  }
}