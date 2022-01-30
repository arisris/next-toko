import prisma from "./prisma";
import * as trpcNext from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";
import { Role, User, Permission } from "@prisma/client";
import { Session } from "next-auth";
import { inferAsyncReturnType } from "@trpc/server";

export class UserContext {
  #user:
    | (User & {
        role: Role & {
          permissions: Permission[];
        };
      })
    | null = null;
  #session: Session;
  constructor(userSession: Session | null = null) {
    this.#session = userSession;
  }
  hasRole(name: string): boolean {
    return !!this.#user && this.#user.role.name === name;
  }
  // assignRoleTo(name: string) {}

  // hasPermission(...values: string[]) {}
  // givePermissionTo(...values: string[]) {}

  // can(...values: string[]) {}
  // cant(...values: string[]) {}

  getUser() {
    return this.#user;
  }
  isAdmin() {
    return this.hasRole("admin");
  }
  isModerator() {
    return this.hasRole("moderator");
  }
  isUser() {
    return this.hasRole("user");
  }
  isGuest() {
    return !this.#user;
  }
  // initialize first
  async init() {
    if (!this.#user) {
      if (this.#session) {
        try {
          this.#user = await prisma.user.findUnique({
            where: { email: this.#session?.user?.email },
            include: {
              role: {
                include: {
                  permissions: true
                }
              }
            }
          });
        } catch (e) {
          this.#user = null;
        }
      }
    }
  }
}

export const createContext = async ({
  req,
  res
}: trpcNext.CreateNextContextOptions) => {
  let user = new UserContext(await getSession({ req }));
  await user.init();
  return {
    req,
    res,
    prisma,
    user
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;