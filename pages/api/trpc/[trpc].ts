import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter as router } from "@/server/appRouter";
import { createContext } from "@/server/context";

export default trpcNext.createNextApiHandler({
  router,
  createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // send to bug reporting
      // console.error("Something went wrong", error);
    }
  },
  batching: {
    enabled: true
  }
});
