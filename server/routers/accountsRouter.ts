import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { AccountsModel } from "@/lib/zod";
import { createRouter } from "@/server/createRouter";
import { z } from "zod";
export const accountsRouter = createRouter()
  .mutation("store", {
    input: z
      .object({
        data: AccountsModel.omit({ id: true })
      })
      .required(),
    async resolve({ ctx, input }) {
      ctx.auth.mustBeReallyUser();
      let items = await ctx.prisma.accounts.create({
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
      data: AccountsModel
    }),
    async resolve({ ctx, input }) {
      ctx.auth.mustBeReallyUser();
      let items = await ctx.prisma.accounts.update({
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
      let items = await ctx.prisma.accounts.delete({
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
      let where: Prisma.AccountsWhereInput;
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
      let items = await ctx.prisma.accounts.findMany({
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
      let items = await ctx.prisma.accounts.findUnique({
        where: { id: input.id }
      });
      return items;
    }
  });
