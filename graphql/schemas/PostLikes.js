const schema = `#graphql
type PostLikes {
  id: Int!
  author: Users
  like: Boolean
  post: Posts
}
`;
const resolvers = {
  /** @type {Resolvers<import("@prisma/client").PostLikes>} */
  PostLikes: {
    author(parent, _args, ctx) {
      return ctx.prisma.users.findUnique({
        where: {
          id: parent.authorId
        }
      });
    },
    post(parent, _args, ctx) {
      return ctx.prisma.posts.findUnique({
        where: {
          id: parent.postId
        }
      });
    }
  }
};

export default { schema, resolvers };
