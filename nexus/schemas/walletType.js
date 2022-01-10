import { extendType, objectType, nonNull, intArg } from "nexus";
import { Wallet } from "nexus-prisma";

const WalletType = objectType({
  name: Wallet.$name,
  description: Wallet.$description,
  definition(t) {
    t.field(Wallet.id);
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