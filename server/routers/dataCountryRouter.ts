import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { DataCountryModel } from "@/lib/zod";
import { createRouter } from "@/server/createRouter";
import { z } from "zod";
export const dataCountryRouter = createRouter()
  .mutation("dataCountry.store", {
    input: z
      .object({
        data: DataCountryModel.omit({ id: true })
      })
      .required(),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.dataCountry.create({
        // @ts-expect-error
        data: {
          // todo
        }
      });
      return items;
    }
  })
  .mutation("dataCountry.update", {
    input: z.object({
      id: z.number(),
      data: DataCountryModel
    }),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.dataCountry.update({
        where: { id: input.id },
        data: {
          // todo
        }
      });
      return items;
    }
  })
  .mutation("dataCountry.destroy", {
    input: z.object({
      id: z.number()
    }),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.dataCountry.delete({
        where: { id: input.id }
      });
      return items;
    }
  })
  .query("dataCountry.all", {
    input: z.object({
      search: z.string().nullish(),
      limit: z.number(),
      cursor: z.number()
    }),
    async resolve({ ctx, input }) {
      let limit = input.limit ?? 10;
      let cursor = input.cursor;
      let where: Prisma.DataCountryWhereInput;
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
      let items = await ctx.prisma.dataCountry.findMany({
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
  .query("dataCountry.one", {
    input: z.object({
      id: z.number()
    }),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.dataCountry.findUnique({
        where: { id: input.id }
      });
      return items;
    }
  });
