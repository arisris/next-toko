import { t } from "@/server/trpc";
import { Prisma } from "@prisma/client";

export const adminRouter = t.router({
  stats: t.procedure.query(async ({ ctx }) => {
    ctx.auth.mustBeReallyAdmin();
    const userCount = await ctx.prisma.user.count();
    const productCount = await ctx.prisma.product.count();
    const storeCount = await ctx.prisma.store.count();
    return {
      userCount,
      productCount,
      storeCount,
    };
  }),
  userSignups: t.procedure.query(async ({ ctx }) => {
    ctx.auth.mustBeReallyAdmin();
    const users = await ctx.prisma.user.findMany({
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const signups = users.reduce((acc, user) => {
      const date = user.createdAt.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});

    return Object.entries(signups).map(([date, count]) => ({
      date,
      count,
    }));
  }),
});
