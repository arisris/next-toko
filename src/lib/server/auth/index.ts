import { db } from "../db";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";
import { error } from "@sveltejs/kit";

export async function login(email: string, password: string): Promise<any> {
  const [foundUser] = await db.select().from(user).where(eq(user.email, email));
  if (!foundUser || !foundUser.password) {
    return null;
  }

  const isValid = await Bun.password.verify(password, foundUser.password);
  if (!isValid) return null;

  return foundUser;
}

export async function getUser(userId: number) {
    const [foundUser] = await db.select().from(user).where(eq(user.id, userId));
    return foundUser;
}
