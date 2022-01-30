import { createReactQueryHooks } from "@trpc/react";
import superjson from "superjson";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { httpLink } from "@trpc/client/links/httpLink";
import { splitLink } from "@trpc/client/links/splitLink";
import { QueryClient } from "react-query";
import { site_url } from "./utils";
import type { AppRouter } from "@/server/appRouter"
import type { inferProcedureOutput } from "@trpc/server";
import type { Procedure } from "@trpc/server/dist/declarations/src/internals/procedure";

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/react#3-create-trpc-hooks
 */
export const trpc = createReactQueryHooks<AppRouter>();
export const transformer = superjson;

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });
export const createTrpcClient = () => {
  const url = site_url("/api/trpc");
  return trpc.createClient({
    url,
    links: [
      // dont catch error in server bechause of console thrown
      function () {
        return ({ prev, next, op }) => {
          next(op, (result) => {
            if (result instanceof Error) {
              if (process.browser) return prev(result);
              // send error object to
              return prev({
                type: "data",
                data: {
                  error: result.data
                }
              });
            }
            //console.log(result)
            prev(result);
          });
        };
      },
      splitLink({
        condition(op) {
          return op.context.skipBatchLink === true;
        },
        true: httpLink({ url }),
        false: httpBatchLink({ url })
      })
    ],
    transformer,
    headers() {
      return {};
    }
  });
};

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */

type inferProcedureInputNoVoid<
  TProcedure extends Procedure<any, any, any, any, any>
> = TProcedure extends Procedure<any, any, infer Input, any, any>
  ? undefined extends Input
    ? Input | null // void is necessary to allow procedures with nullish input to be called without an input
    : Input
  : undefined;
export type inferQueryOutput<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferMutationOutput<
  TRouteKey extends keyof AppRouter["_def"]["mutations"]
> = inferProcedureOutput<AppRouter["_def"]["mutations"][TRouteKey]>;

export type inferQueryInput<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureInputNoVoid<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferMutationInput<
  TRouteKey extends keyof AppRouter["_def"]["mutations"]
> = inferProcedureInputNoVoid<AppRouter["_def"]["mutations"][TRouteKey]>;
