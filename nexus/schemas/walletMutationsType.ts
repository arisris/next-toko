import { extendType, objectType, nonNull, intArg } from "nexus";
import { WalletMutations } from "nexus-prisma";

const WalletMutationsType = objectType({
  name: WalletMutations.$name,
  description: WalletMutations.$description,
  definition(t) {
    t.field(WalletMutations.id);
    t.field(WalletMutations.type);
    t.field(WalletMutations.wallet);
    t.field(WalletMutations.amount);
    t.field(WalletMutations.isVerified);
    t.field(WalletMutations.verifiedAt);
    t.field(WalletMutations.createdAt);
    t.field(WalletMutations.updatedAt);
  }
});

const WalletMutationsQueryType = extendType({
  type: "Query",
  definition(t) {
    t.field("getWalletMutations", {
      type: WalletMutations.$name,
      args: {
        id: nonNull(intArg())
      },
      resolve(source, { id }, ctx) {
        return ctx.prisma.walletMutations.findUnique({
          where: { id }
        });
      }
    });
}
});

export default [WalletMutationsType, WalletMutationsQueryType];
