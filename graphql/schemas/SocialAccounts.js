const schema = `#graphql
type SocialAccounts {
  id: Int!
  provider: String!
  token: String!
  refreshToken: String!
  user: Users
}
`;
const resolvers = {
  /** @type {Resolvers<import("@prisma/client").SocialAccounts>} */
  SocialAccounts: {
    user(parent, _args, ctx) {
      return ctx.prisma.users.findUnique({
        where: {
          id: parent.userId
        }
      });
    }
  }
};

export default { schema, resolvers };
