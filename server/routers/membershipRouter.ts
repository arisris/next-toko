import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { MembershipModel } from "@/lib/zod";
import { createRouter } from "@/server/createRouter";
import { z } from "zod";
export const membershipRouter = createRouter()
  .mutation("membership.store", {
    input: z
      .object({
        data: MembershipModel.omit({ id: true })
      })
      .required(),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.membership.create({
        // @ts-expect-error
        data: {
          // todo
        }
      });
      return items;
    }
  })
  .mutation("membership.update", {
    input: z.object({
      id: z.number(),
      data: MembershipModel
    }),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.membership.update({
        where: { id: input.id },
        data: {
          // todo
        }
      });
      return items;
    }
  })
  .mutation("membership.destroy", {
    input: z.object({
      id: z.number()
    }),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.membership.delete({
        where: { id: input.id }
      });
      return items;
    }
  })
  .query("membership.all", {
    input: z.object({
      search: z.string().nullish(),
      limit: z.number(),
      cursor: z.number()
    }),
    async resolve({ ctx, input }) {
      let limit = input.limit ?? 10;
      let cursor = input.cursor;
      let where: Prisma.MembershipWhereInput;
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
      let items = await ctx.prisma.membership.findMany({
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
  .query("membership.one", {
    input: z.object({
      id: z.number()
    }),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.membership.findUnique({
        where: { id: input.id }
      });
      return items;
    }
  });
