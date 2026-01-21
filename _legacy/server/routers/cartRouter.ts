import { t } from "@/server/trpc";
import { z } from "zod";

export const cartRouter = t.router({
  get: t.procedure.query(async ({ ctx }) => {
    ctx.auth.mustBeReallyUser();
    const userId = ctx.auth.user.id;

    let cart = await ctx.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await ctx.prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    return cart;
  }),

  add: t.procedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      ctx.auth.mustBeReallyUser();
      const userId = ctx.auth.user.id;
      const { productId, quantity } = input;

      const cart = await ctx.prisma.cart.findUnique({ where: { userId } });
      if (!cart) {
        await ctx.prisma.cart.create({ data: { userId } });
      }

      const cartItem = await ctx.prisma.cartItem.findFirst({
        where: { cart: { userId }, productId },
      });

      if (cartItem) {
        return ctx.prisma.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: cartItem.quantity + quantity },
        });
      } else {
        return ctx.prisma.cartItem.create({
          data: {
            cart: { connect: { userId } },
            product: { connect: { id: productId } },
            quantity,
          },
        });
      }
    }),

  remove: t.procedure
    .input(z.object({ cartItemId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      ctx.auth.mustBeReallyUser();
      return ctx.prisma.cartItem.delete({
        where: { id: input.cartItemId },
      });
    }),

  updateQuantity: t.procedure
    .input(
      z.object({
        cartItemId: z.number(),
        quantity: z.number().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      ctx.auth.mustBeReallyUser();
      return ctx.prisma.cartItem.update({
        where: { id: input.cartItemId },
        data: { quantity: input.quantity },
      });
    }),
});
