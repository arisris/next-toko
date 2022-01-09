const schema = `#graphql
type Comments {
  id: Int! 
  status: EnumCommentStatus
  body: String
  author: Users
  post: Posts
  comments: [Comments]
  comment: Comments
  likes: [CommentsLike]
}
`;
const resolvers = {
  /** @type {Resolvers<import("@prisma/client").Comments>} */
  Comments: {
    comments(parent, _args, ctx) {
      return ctx.prisma.comments.findMany({
        where: {
          commentId: parent.id
        }
      });
    },
    comment(parent, _args, ctx) {
      return ctx.prisma.comments.findUnique({
        where: {
          id: parent.commentId
        }
      });
    }
  }
};

export default { schema, resolvers };
