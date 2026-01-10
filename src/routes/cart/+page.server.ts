import { db } from '$lib/server/db';
import { cart, cartItem, product } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    // Get user's cart
    let [userCart] = await db.select().from(cart).where(eq(cart.userId, locals.user.id));

    if (!userCart) {
        // Create cart if not exists
        [userCart] = await db.insert(cart).values({ userId: locals.user.id }).returning();
    }

    // Get items
    const items = await db.select({
        id: cartItem.id,
        quantity: cartItem.quantity,
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        productImage: product.description // placeholder mapping
    })
    .from(cartItem)
    .innerJoin(product, eq(cartItem.productId, product.id))
    .where(eq(cartItem.cartId, userCart.id));

    return {
        items,
        total: items.reduce((acc, item) => acc + (item.productPrice * item.quantity), 0)
    };
}

export const actions = {
    add: async ({ request, locals }) => {
        if (!locals.user) return fail(401);
        const data = await request.formData();
        const productId = Number(data.get('productId'));
        const quantity = Number(data.get('quantity')) || 1;

        let [userCart] = await db.select().from(cart).where(eq(cart.userId, locals.user.id));
        if (!userCart) {
            [userCart] = await db.insert(cart).values({ userId: locals.user.id }).returning();
        }

        // Check if item exists
        const [existingItem] = await db.select().from(cartItem)
            .where(and(eq(cartItem.cartId, userCart.id), eq(cartItem.productId, productId)));

        if (existingItem) {
            await db.update(cartItem)
                .set({ quantity: existingItem.quantity + quantity })
                .where(eq(cartItem.id, existingItem.id));
        } else {
            await db.insert(cartItem).values({
                cartId: userCart.id,
                productId,
                quantity
            });
        }
    },
    remove: async ({ request, locals }) => {
        if (!locals.user) return fail(401);
        const data = await request.formData();
        const itemId = Number(data.get('itemId'));
        await db.delete(cartItem).where(eq(cartItem.id, itemId));
    }
};
