import { extendType, objectType, nonNull, intArg } from "nexus";
import { Wallet } from "nexus-prisma";

const WalletType = objectType({
  name: Wallet.$name,
  description: Wallet.$description,
  definition(t) {
    t.field(Wallet.id);
    t.field(Wallet.amount);
    t.field(Wallet.isVerified);
    t.field(Wallet.verifiedAt);
    t.field(Wallet.createdAt);
    t.field(Wallet.updatedAt);
    // t.field("users", {
    //   type: Wallet.users.type,
    //   args: {
    //     take: intArg({ default: 5 }),
    //     skip: intArg({ default: 0 })
    //   },
    //   resolve(source, { take, skip }, ctx) {
    //     return ctx.prisma.users.findMany({
    //       where: {
    //         authorId: source.id
    //       },
    //       orderBy: { id: "desc" },
    //       take,
    //       skip
    //     });
    //   }
    // });
    t.field("mutations", {
      type: Wallet.mutations.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.walletMutations.findMany({
          where: {
            walletId: source.id
          },
          orderBy: { id: "desc" },
          take,
          skip
        });
      }
    });
  }
});

const WalletQueryType = extendType({
  type: "Query",
  definition(t) {
    t.field("getWallet", {
      type: Wallet.$name,
      args: {
        id: nonNull(intArg())
      },
      resolve(source, { id }, ctx) {
        return ctx.prisma.wallet.findUnique({
          where: { id }
        });
      }
    });
}
});

export default [WalletType, WalletQueryType];