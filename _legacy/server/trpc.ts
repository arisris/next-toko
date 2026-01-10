import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import { Context } from "./context";

export const t = initTRPC.context<Context>().create({
	transformer: SuperJSON,
});
