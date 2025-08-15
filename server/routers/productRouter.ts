import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { ProductModel } from "@/lib/zod";
import { t } from "@/server/trpc";
import { z } from "zod";

export const productRouter = t.router({
  store: t.procedure
    .input(ProductModel.omit({ id: true, authorId: true, storeId: true, storeFrontId: true }))
    .mutation(async ({ ctx, input }) => {
      ctx.auth.mustBeReallyUser();
      const store = await ctx.prisma.store.findUnique({ where: { ownerId: ctx.auth.user.id } });
      if (!store) throw new TRPCError({ code: "FORBIDDEN", message: "You do not have a store." });

      return ctx.prisma.product.create({
        data: {
          ...input,
          authorId: ctx.auth.user.id,
          storeId: store.id,
          storeFrontId: store.storeFront[0].id, // a store should have a storefront
        },
      });
    }),
  update: t.procedure
    .input(z.object({ id: z.number(), data: ProductModel.partial() }))
    .mutation(async ({ ctx, input }) => {
      ctx.auth.mustBeReallyUser();
      const product = await ctx.prisma.product.findUnique({ where: { id: input.id } });
      if (!product || product.authorId !== ctx.auth.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "You do not own this product." });
      }
      return ctx.prisma.product.update({
        where: { id: input.id },
        data: input.data,
      });
    }),
  delete: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      ctx.auth.mustBeReallyUser();
      const product = await ctx.prisma.product.findUnique({ where: { id: input.id } });
      if (!product || product.authorId !== ctx.auth.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "You do not own this product." });
      }
      return ctx.prisma.product.delete({
        where: { id: input.id },
      });
    }),
  all: t.procedure
    .input(
      z.object({
        search: z.string().nullish(),
        limit: z.number(),
        cursor: z.number().nullish(),
        sortBy: z.string().nullish(),
        storeId: z.number().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      let limit = input.limit ?? 10;
      let cursor = input.cursor;
      let where: Prisma.ProductWhereInput = {};
      if (input.search) {
        where.name = { contains: input.search };
      }
      if (input.storeId) {
        where.storeId = input.storeId;
      }

      let orderBy: Prisma.ProductOrderByWithRelationInput = {};
      if (input.sortBy === 'price-asc') {
        orderBy = { price: 'asc' };
      } else if (input.sortBy === 'price-desc') {
        orderBy = { price: 'desc' };
      }

      let items = await ctx.prisma.product.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where,
        orderBy,
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
      let items = await ctx.prisma.product.findUnique({
        where: { id: input.id }
      });
      return items;
    })
});
