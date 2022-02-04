import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { DataProvinceModel } from "@/lib/zod";
import { createRouter } from "@/server/createRouter";
import { z } from "zod";
export const dataProvinceRouter = createRouter()
  .mutation("dataProvince.store", {
    input: z
      .object({
        data: DataProvinceModel.omit({ id: true })
      })
      .required(),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.dataProvince.create({
        // @ts-expect-error
        data: {
          // todo
        }
      });
      return items;
    }
  })
  .mutation("dataProvince.update", {
    input: z.object({
      id: z.number(),
      data: DataProvinceModel
    }),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.dataProvince.update({
        where: { id: input.id },
        data: {
          // todo
        }
      });
      return items;
    }
  })
  .mutation("dataProvince.destroy", {
    input: z.object({
      id: z.number()
    }),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.dataProvince.delete({
        where: { id: input.id }
      });
      return items;
    }
  })
  .query("dataProvince.all", {
    input: z.object({
      search: z.string().nullish(),
      limit: z.number(),
      cursor: z.number()
    }),
    async resolve({ ctx, input }) {
      let limit = input.limit ?? 10;
      let cursor = input.cursor;
      let where: Prisma.DataProvinceWhereInput;
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
      let items = await ctx.prisma.dataProvince.findMany({
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
  .query("dataProvince.one", {
    input: z.object({
      id: z.number()
    }),
    async resolve({ ctx, input }) {
      let items = await ctx.prisma.dataProvince.findUnique({
        where: { id: input.id }
      });
      return items;
    }
  });
