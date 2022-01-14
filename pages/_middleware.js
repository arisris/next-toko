// import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

/**
 * Note: This middleware run only on Node server or Edge Runtime like vercel
 * @type {import("next/server").NextMiddleware}
 */
export default async function _middleware(req, event) {
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
}
