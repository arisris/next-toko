import { Session } from "next-auth";

type CRUD = "create" | "read" | "update" | "delete" | "any";

export default function ability(session: Session) {
  return {
    async can(name: CRUD) {},
    async cant(name: CRUD) {}
  };
}
