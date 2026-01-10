import jwt from 'jsonwebtoken';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const SECRET_KEY = process.env.APP_SECRET_KEY || 'secret';

export async function handle({ event, resolve }) {
  const token = event.cookies.get('token');

  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      if (typeof decoded === 'object' && decoded.id) {
          const [foundUser] = await db.select().from(user).where(eq(user.id, decoded.id));
          if (foundUser) {
              event.locals.user = { id: foundUser.id, name: foundUser.name, email: foundUser.email, roleId: foundUser.roleId };
          }
      }
    } catch (e) {
      // Invalid token
    }
  }

  const response = await resolve(event);
  return response;
}
