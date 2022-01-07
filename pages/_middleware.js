import { NextResponse } from 'next/server';

/**
 * @type {import("next/server").NextMiddleware}
 */
export default async function _middleware(req, event) {
  const response = NextResponse.next();
  // set app name
  response.headers.set('X-Site-Name', 'Arisris.con');

  return response;
}
