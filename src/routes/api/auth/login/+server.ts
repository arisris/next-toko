import { login } from '$lib/server/auth';
import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.APP_SECRET_KEY || 'secret';

export async function POST({ request, cookies }) {
  const { email, password } = await request.json();
  const user = await login(email, password);

  if (!user) {
    return json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });

  cookies.set('token', token, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return json({ user: { id: user.id, name: user.name, email: user.email } });
}
