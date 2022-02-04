import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { StoreLocationModel } from "@/lib/zod";
import { createRouter } from "@/server/createRouter";
import { z } from "zod";
export const storeLocationRouter = createRouter()
  .mutation("store", {
    input: z
      .object({
        data: StoreLocationModel.omit({ id: true })
      })
      .required(),
    async resolve({ ctx, input }) {
      ctx.auth.mustBeReallyUser();
      let items = await ctx.prisma.storeLocation.create({
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
      data: StoreLocationModel
    }),
    async resolve({ ctx, input }) {
      ctx.auth.mustBeReallyUser();
      let items = await ctx.prisma.storeLocation.update({
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
      let items = await ctx.prisma.storeLocation.delete({
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
      let where: Prisma.StoreLocationWhereInput;
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
      let items = await ctx.prisma.storeLocation.findMany({
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
      let items = await ctx.prisma.storeLocation.findUnique({
        where: { id: input.id }
      });
      return items;
    }
  });
