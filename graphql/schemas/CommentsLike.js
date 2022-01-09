const schema = `#graphql
type CommentsLike {
  id: Int!
  author: Users
  like: Boolean
  comment: Comments
}
`;
const resolvers = {
  /** @type {Resolvers<import("@prisma/client").CommentLikes>} */
  CommentsLike: {
    
  }
};

export default { schema, resolvers };
