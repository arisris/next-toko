import { NextMiddleware, NextResponse } from "next/server";

// const isLiveSite =
//   process.env.NODE_ENV === "production" && process.env.VERCEL === "1";
const handler: NextMiddleware = async (req, event) => {
  // let { pathname } = req.nextUrl;
  // let hostname = req.headers.get("host");
  // let currentHost = isLiveSite
  //   ? hostname.replace(".next-toko.arisris.com", "")
  //   : hostname.replace(".localhost:3000", "");

  // // ensure no anyone can access this /_admin path instead redirectTo homepage
  // if (pathname.startsWith("/_admin")) return NextResponse.redirect("/");
  // if (!pathname.includes(".") && !pathname.startsWith("/api")) {
  //   if (
  //     hostname === "admin.next-toko.arisris.com" ||
  //     hostname === "admin.localhost:3000"
  //   ) {
  //     return NextResponse.rewrite(`/_admin${pathname}`);
  //   }
  // }

  return NextResponse.next();
};

export default handler;
