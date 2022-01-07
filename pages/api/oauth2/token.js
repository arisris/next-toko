import { oauthAccessToken } from "@/libs/oauth2/server";

/**
 * @type { import("next").NextApiHandler }
 */
 export default async function handler(req, res) {
  try {
    const token = await oauthAccessToken(req, res);
    return res.json(token);
  } catch (e) {
    return res.status(e.code).json(e);
  }
}