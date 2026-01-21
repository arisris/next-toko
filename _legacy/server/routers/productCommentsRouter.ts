import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { ProductCommentsModel } from "@/lib/zod";
import { t } from "@/server/trpc";
import { z } from "zod";

export const productCommentsRouter = t.router({
  store: t.procedure
    .input(
      z
        .object({
          data: ProductCommentsModel.omit({ id: true })
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      ctx.auth.mustBeReallyUser();
      let items = await ctx.prisma.productComments.create({
        // @ts-expect-error
        data: {
          // todo
        }
      });
      return items;
    }),
  update: t.procedure
    .input(
      z.object({
        id: z.number(),
        data: ProductCommentsModel
      })
    )
    .mutation(async ({ ctx, input }) => {
      ctx.auth.mustBeReallyUser();
      let items = await ctx.prisma.productComments.update({
        where: { id: input.id },
        data: {
          // todo
        }
      });
      return items;
    }),
  delete: t.procedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      ctx.auth.mustBeReallyUser();
      let items = await ctx.prisma.productComments.delete({
        where: { id: input.id }
      });
      return items;
    }),
  all: t.procedure
    .input(
      z.object({
        search: z.string().nullish(),
        limit: z.number(),
        cursor: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      let limit = input.limit ?? 10;
      let cursor = input.cursor;
      let where: Prisma.ProductCommentsWhereInput | undefined;
      if (input.search) {
        // where.name = {
        //   contains: input.search
        // };
        // where.OR = {
        //   name: {
        //     startsWith: input.search
        //   }
        // };
      }
      let items = await ctx.prisma.productComments.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where
      });
      let next: typeof cursor | null = null;
      if (items.length > limit) {
        let nextItem = items.pop();
        next = nextItem!.id;
      }
      return { items, next };
    }),
  query: t.procedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      let items = await ctx.prisma.productComments.findUnique({
        where: { id: input.id }
      });
      return items;
    })
});
