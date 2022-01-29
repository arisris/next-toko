import superjson from "superjson";
import { createRouter, errorFormater } from "./utils";

export const appRouter = createRouter()
  .formatError(errorFormater)
  .transformer(superjson)
  // .middleware(async ({ ctx, next }) => {
  //   return next();
  // })
  // .merge("users.", userRouter)
  // .merge("auth.", authRouter);
