import { db } from '$lib/server/db';
import { product, productComments, user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const id = Number(params.id);
    if (isNaN(id)) throw error(404, 'Invalid product ID');

    const [foundProduct] = await db.select().from(product).where(eq(product.id, id));

    if (!foundProduct) throw error(404, 'Product not found');

    // Fetch comments
    // Drizzle currently doesn't support easy nested relations in `select` without `query` builder which requires relational setup
    // For now, I'll do a separate query or use a join if I had defined relations in schema (which I did with foreign keys but `query` API needs `relations` definition in drizzle)
    // I'll stick to simple query for now.

    // Join comments with authors
    const comments = await db.select({
        id: productComments.id,
        description: productComments.description,
        rating: productComments.rating,
        createdAt: productComments.createdAt,
        authorName: user.name,
        authorImage: user.image
    })
    .from(productComments)
    .leftJoin(user, eq(productComments.authorId, user.id))
    .where(eq(productComments.productId, id));

    return {
        product: foundProduct,
        comments
    };
}
