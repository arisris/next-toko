import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET({ params }) {
  const id = Number(params.id);
  const [foundUser] = await db.select().from(user).where(eq(user.id, id));

  if (!foundUser) return json({ error: 'Not found' }, { status: 404 });
  return json(foundUser);
}

export async function PUT({ params, request, locals }) {
  if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
  const id = Number(params.id);
  const data = await request.json();

  const [updatedUser] = await db.update(user).set(data).where(eq(user.id, id)).returning();
  return json(updatedUser);
}

export async function DELETE({ params, locals }) {
  if (!locals.user) return json({ error: 'Unauthorized' }, { status: 401 });
  const id = Number(params.id);

  await db.delete(user).where(eq(user.id, id));
  return json({ success: true });
}
