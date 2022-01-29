import { createContext } from "react";
import { appRouter } from "./appRouter";

export type AppRouter = typeof appRouter;
export type Context = trpc.inferAsyncReturnType<typeof createContext>;