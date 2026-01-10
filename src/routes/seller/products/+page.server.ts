import { db } from '$lib/server/db';
import { product, store } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) throw redirect(302, '/login');

    // Get user's store
    const [userStore] = await db.select().from(store).where(eq(store.ownerId, locals.user.id));

    if (!userStore) {
        // Redirect to create store page or show message
        // For simplicity, returning empty
        return { products: [] };
    }

    const products = await db.select().from(product).where(eq(product.storeId, userStore.id));

    return {
        products
    };
}
