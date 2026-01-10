import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    const username = data.get('username');

    if (!email || !password || !username) {
      return fail(400, { missing: true });
    }

    // Check if user exists
    const existingUser = await db.select().from(user).where(eq(user.email, email.toString()));
    if (existingUser.length > 0) {
        return fail(400, { error: 'User already exists' });
    }

    const hashedPassword = await Bun.password.hash(password.toString());

    await db.insert(user).values({
        email: email.toString(),
        password: hashedPassword,
        username: username.toString(),
        name: username.toString(), // Default name
    });

    throw redirect(303, '/login');
  }
};
