const schema = `#graphql
type Users {
  id: Int!
  name: String!
  email: String!
  emailVerified: Boolean
  phoneNumber: String
  image: String
  role: EnumRole
  createdAt: DateTime
  updatedAt: DateTime
  posts: [Posts]
  postLikes: [PostLikes]
  socialAccounts: [SocialAccounts]
  comments: [Comments]
  commentLike: [CommentsLike]
  wallet: Wallet
}
`;
/** @type {Resolvers<import("@prisma/client").Users>} */
const resolvers = {
  /** @type {Resolvers<import("@prisma/client").Users>} */
  Users: {
    posts(parent, _args, ctx) {
      return ctx.prisma.posts.findMany({
        where: {
          authorId: parent.id
        },
        take: 10
      });
    },
    postLikes(parent, _args, ctx) {
      return ctx.prisma.postLikes.findMany({
        where: {
          authorId: parent.id
        },
        take: 10
      });
    },
    socialAccounts(parent, _args, ctx) {
      return ctx.prisma.socialAccounts.findMany({
        where: {
          userId: parent.id
        },
        take: 10
      });
    },
    posts(parent, _args, ctx) {
      return ctx.prisma.posts.findMany({
        where: {
          authorId: parent.id
        },
        take: 10
      });
    },
    comments(parent, _args, ctx) {
      return ctx.prisma.comments.findMany({
        where: {
          authorId: parent.id
        },
        take: 10
      });
    },
    commentLike(parent, _args, ctx) {
      return ctx.prisma.commentLikes.findMany({
        where: {
          authorId: parent.id
        },
        take: 10
      });
    },
    wallet(parent, _args, ctx) {
      return ctx.prisma.wallet.findUnique({
        where: {
          // todo fix
          id: undefined // parent.id
        }
      });
    }
  }
};

export default { schema, resolvers };
