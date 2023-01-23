import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { StoreTeamModel } from "@/lib/zod";
import { t } from "@/server/trpc";
import { z } from "zod";

export const storeTeamRouter = t.router({
  store: t.procedure
    .input(
      z
        .object({
          data: StoreTeamModel.omit({ id: true })
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      ctx.auth.mustBeReallyUser();
      let items = await ctx.prisma.storeTeam.create({
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
        data: StoreTeamModel
      })
    )
    .mutation(async ({ ctx, input }) => {
      ctx.auth.mustBeReallyUser();
      let items = await ctx.prisma.storeTeam.update({
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
      let items = await ctx.prisma.storeTeam.delete({
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
      let where: Prisma.StoreTeamWhereInput | undefined;
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
    }),
  query: t.procedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .query(async ({ ctx, input }) => {
      let items = await ctx.prisma.storeTeam.findUnique({
        where: { id: input.id }
      });
      return items;
    })
});
