import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { StoreTeamModel } from "@/lib/zod";
import { createRouter } from "@/server/createRouter";
import { z } from "zod";
export const storeTeamRouter = createRouter()
  .mutation("storeTeam.store", {
    input: z
      .object({
        data: StoreTeamModel.omit({ id: true })
      })
      .required(),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.storeTeam.create({
        // @ts-expect-error
        data: {
          // todo
        }
      });
      return items;
    }
  })
  .mutation("storeTeam.update", {
    input: z.object({
      id: z.number(),
      data: StoreTeamModel
    }),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.storeTeam.update({
        where: { id: input.id },
        data: {
          // todo
        }
      });
      return items;
    }
  })
  .mutation("storeTeam.destroy", {
    input: z.object({
      id: z.number()
    }),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.storeTeam.delete({
        where: { id: input.id }
      });
      return items;
    }
  })
  .query("storeTeam.all", {
    input: z.object({
      search: z.string().nullish(),
      limit: z.number(),
      cursor: z.number()
    }),
    async resolve({ ctx, input }) {
      let limit = input.limit ?? 10;
      let cursor = input.cursor;
      let where: Prisma.StoreTeamWhereInput;
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
      let items = await ctx.prisma.storeTeam.findMany({
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
  .query("storeTeam.one", {
    input: z.object({
      id: z.number()
    }),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.storeTeam.findUnique({
        where: { id: input.id }
      });
      return items;
    }
  });
