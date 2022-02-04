import { Permission, PrismaClient, Role, User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import { Session } from "next-auth";

export const mustBeReally = (
  condition: boolean,
  err?: { message?: string; code?: TRPC_ERROR_CODE_KEY }
) => {
  if (condition) return true;
  throw new TRPCError({
    code: err.code ?? "BAD_REQUEST",
    message: err.message ?? "Bad Request"
  });
};

export class Authorization {
  #user:
    | (User & {
        role: Role & {
          permissions: Permission[];
        };
      })
    | null = null;
  constructor(private prisma: PrismaClient) {
    this.#user = null;
  }
  hasRole(name: string): boolean {
    return !!this.user && this.user.role.name === name;
  }
  // assignRoleTo(name: string) {}

  // hasPermission(...values: string[]) {}
  // givePermissionTo(...values: string[]) {}

  // can(...values: string[]) {}
  // cant(...values: string[]) {}

  get user() {
    return this.#user;
  }
  isAdmin() {
    return this.hasRole("admin");
  }
  mustBeReallyAdmin() {
    mustBeReally(this.isAdmin(), {
      message: "You are Not administrator",
      code: "UNAUTHORIZED"
    });
  }
  isModerator() {
    return this.hasRole("moderator") || this.isAdmin();
  }
  mustBeReallyModerator() {
    mustBeReally(this.isModerator(), {
      message: "You are Not moderator",
      code: "UNAUTHORIZED"
    });
  }
  isUser() {
    return this.hasRole("user") || this.isModerator();
  }
  mustBeReallyUser() {
    mustBeReally(this.isUser(), {
      message: "You are Not user",
      code: "UNAUTHORIZED"
    });
  }
  isGuest() {
    return !this.user;
  }
  // initialize first
  async init(session: Session) {
    if (!session?.user?.email) return null;
    try {
      this.#user = await this.prisma.user.findUnique({
        where: { email: session.user.email },
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
