import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { CartModel } from "@/lib/zod";
import { createRouter } from "@/server/createRouter";
import { z } from "zod";
export const cartRouter = createRouter()
  .mutation("store", {
    input: z
      .object({
        data: CartModel.omit({ id: true })
      })
      .required(),
    async resolve({ ctx, input }) {
      ctx.auth.mustBeReallyUser();
      let items = await ctx.prisma.cart.create({
        // @ts-expect-error
        data: {
          // todo
        }
      });
      return items;
    }
  })
  .mutation("update", {
    input: z.object({
      id: z.number(),
      data: CartModel
    }),
    async resolve({ ctx, input }) {
      ctx.auth.mustBeReallyUser();
      let items = await ctx.prisma.cart.update({
        where: { id: input.id },
        data: {
          // todo
        }
      });
      return items;
    }
  })
  .mutation("destroy", {
    input: z.object({
      id: z.number()
    }),
    async resolve({ ctx, input }) {
      ctx.auth.mustBeReallyUser();
      let items = await ctx.prisma.cart.delete({
        where: { id: input.id }
      });
      return items;
    }
  })
  .query("all", {
    input: z.object({
      search: z.string().nullish(),
      limit: z.number(),
      cursor: z.number()
    }),
    async resolve({ ctx, input }) {
      let limit = input.limit ?? 10;
      let cursor = input.cursor;
      let where: Prisma.CartWhereInput;
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
      let items = await ctx.prisma.cart.findMany({
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
    }
  })
  .query("byId", {
    input: z.object({
      id: z.number()
    }),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.cart.findUnique({
        where: { id: input.id }
      });
      return items;
    }
  });
