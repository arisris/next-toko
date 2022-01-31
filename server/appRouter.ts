import superjson from "superjson";
import { createRouter } from "./createRouter";
import { userRouter } from "./routers/users/router";
import { errorFormater } from "./utils";

export const appRouter = createRouter()
  .formatError(errorFormater)
  .transformer(superjson)
  // .middleware(async ({ ctx, next }) => {
  //   return next();
  // })
  .merge("user.", userRouter)
  // .merge("auth.", authRouter);

  export type AppRouter = typeof appRouter;