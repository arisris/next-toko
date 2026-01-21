import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq, like, or } from 'drizzle-orm';

export async function GET({ url }) {
  const limit = Number(url.searchParams.get('limit')) || 10;
  const cursor = Number(url.searchParams.get('cursor')) || 0;
  const search = url.searchParams.get('search');

  let query = db.select().from(user).limit(limit + 1);

  if (cursor) {
      // Simple offset pagination simulation for now, but ideal is cursor based on ID
      // But current query just assumes ID > cursor
      // query = query.where(gt(user.id, cursor));
  }

  if (search) {
      query.where(or(like(user.name, `%${search}%`), like(user.email, `%${search}%`)));
  }

  const items = await query;

  let next = null;
  if (items.length > limit) {
      const nextItem = items.pop();
      next = nextItem?.id;
  }

  return json({ items, next });
}

export async function POST({ request, locals }) {
    if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
    // Implementation for creating user
    const data = await request.json();
    const newUser = await db.insert(user).values(data).returning();
    return json(newUser[0]);
}
