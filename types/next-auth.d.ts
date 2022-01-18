import { DefaultUser, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface UserData extends DefaultUser {
    id?: number;
    role?: number;
  }
  interface Session {
    user?: UserData;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    userId?: number;
  }
}
