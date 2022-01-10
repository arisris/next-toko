import { extendType, objectType, nonNull, intArg } from "nexus";
import { SocialAccounts } from "nexus-prisma";

const SocialAccountsType = objectType({
  name: SocialAccounts.$name,
  description: SocialAccounts.$description,
  definition(t) {
    t.field(SocialAccounts.id);
  }
});

const SocialAccountsQueryType = extendType({
  type: "Query",
  definition(t) {
    t.field("getSocialAccounts", {
      type: SocialAccounts.$name,
      args: {
        id: nonNull(intArg())
      },
      resolve(source, { id }, ctx) {
        return ctx.prisma.socialAccounts.findUnique({
          where: { id }
        });
      }
    });
}
});

export default [SocialAccountsType, SocialAccountsQueryType];
