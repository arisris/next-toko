// import { getToken } from "next-auth/jwt";
import { NextMiddleware, NextResponse } from "next/server";

const handler: NextMiddleware = async (req, event) => {
  const response = NextResponse.next();

  /**
   * Todo the next-auth session can be reading with this
   */

  // const user = await getToken({
  //   req,
  //   secret: process.env.APP_SECRET_KEY,
  //   secureCookie:
  //     process.env.NEXTAUTH_URL?.startsWith("https://") ??
  //     !!process.env.VERCEL_URL
  // });
  // console.log(user);

  // this is example to append headers object at all request
  response.headers.set("X-Site-Name", "Arisris.con");
  return response;
};

export default handler;
