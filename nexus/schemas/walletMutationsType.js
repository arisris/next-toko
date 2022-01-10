import { extendType, objectType, nonNull, intArg } from "nexus";
import { WalletMutations } from "nexus-prisma";

const WalletMutationsType = objectType({
  name: WalletMutations.$name,
  description: WalletMutations.$description,
  definition(t) {
    t.field(WalletMutations.id);
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
