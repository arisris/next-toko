import { t } from "./trpc";
import { type AppRouter, appRouter as _appRouter } from "./routers/_app";

export const appRouter = t.mergeRouters(
	t.router({
		hello: t.procedure.query(() => "Hello World"),
	}),
	_appRouter,
);

export { AppRouter };
