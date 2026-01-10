import { db } from '$lib/server/db';
import { product } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq, like } from 'drizzle-orm';

export async function GET({ url }) {
  const limit = Number(url.searchParams.get('limit')) || 10;
  // const cursor = Number(url.searchParams.get('cursor')) || 0;

  // Simple query for now
  const items = await db.select().from(product).limit(limit);

  return json({ items, next: null });
}
