import { db } from '$lib/server/db';
import { product, store, storeFront } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) throw redirect(302, '/login');
    // Ensure user has a store, otherwise create one?
    // This is getting complex, assuming user has store for now or auto-create in a real app.
}

export const actions = {
    default: async ({ request, locals }) => {
        if (!locals.user) return fail(401);
        const data = await request.formData();
        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const price = Number(data.get('price'));
        const stock = Number(data.get('stock'));

        // Validate
        if (!name || isNaN(price) || isNaN(stock)) {
            return fail(400, { missing: true });
        }

        // Get/Create Store
        let [userStore] = await db.select().from(store).where(eq(store.ownerId, locals.user.id));
        if (!userStore) {
             [userStore] = await db.insert(store).values({
                 ownerId: locals.user.id,
                 name: `${locals.user.name}'s Store`,
             }).returning();
        }

        // Create default StoreFront if needed (schema requires it)
        let [sf] = await db.select().from(storeFront).where(eq(storeFront.storeId, userStore.id));
        if (!sf) {
            [sf] = await db.insert(storeFront).values({
                storeId: userStore.id,
                name: "Main Front",
                description: "Default",
            }).returning();
        }

        await db.insert(product).values({
            name,
            description,
            price,
            stock,
            storeId: userStore.id,
            storeFrontId: sf.id,
            authorId: locals.user.id
        });

        throw redirect(303, '/seller/products');
    }
};
