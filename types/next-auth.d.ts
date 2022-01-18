import { EnumRole } from "@prisma/client";
import { DefaultUser, Session, UserData } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface UserData extends DefaultUser {
    id?: number;
    role?: EnumRole;
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
declare module "next" {
  interface NextApiRequest extends NextApiRequest {
    session?: Session;
    user?: UserData;
  }
}