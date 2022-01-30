import { createRouter } from "@/server/createRouter";

export const userRouter = createRouter().query("me", {
  resolve: async ({ ctx }) => {
    return ctx.user.getUser();
  }
});
