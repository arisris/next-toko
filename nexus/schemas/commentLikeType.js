import { extendType, objectType, nonNull, intArg } from "nexus";
import { CommentLikes } from "nexus-prisma";

const CommentLikesType = objectType({
  name: CommentLikes.$name,
  description: CommentLikes.$description,
  definition(t) {
    t.field(CommentLikes.id);
  }
});

const CommentLikesQueryType = extendType({
  type: "Query",
  definition(t) {
    t.field("getCommentLikes", {
      type: CommentLikes.$name,
      args: {
        id: nonNull(intArg())
      },
      resolve(source, { id }, ctx) {
        return ctx.prisma.commentLikes.findUnique({
          where: { id }
        });
      }
    });
}
});

export default [CommentLikesType, CommentLikesQueryType];
