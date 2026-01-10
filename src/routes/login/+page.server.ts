import { fail, redirect } from '@sveltejs/kit';
import { login } from '$lib/server/auth';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.APP_SECRET_KEY || 'secret';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      return fail(400, { email, missing: true });
    }

    const user = await login(email.toString(), password.toString());

    if (!user) {
      return fail(400, { email, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });

    cookies.set('token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    throw redirect(303, '/');
  }
};
