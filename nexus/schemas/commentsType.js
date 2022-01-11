import { extendType, objectType, nonNull, intArg } from "nexus";
import { Comments } from "nexus-prisma";

const CommentsType = objectType({
  name: Comments.$name,
  description: Comments.$description,
  definition(t) {
    t.field(Comments.id);
    t.field(Comments.status);
    t.field(Comments.body);
    t.field(Comments.author);
    t.field(Comments.comment);
    t.field(Comments.post);
    t.field(Comments.likes.name, {
      type: Comments.likes.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.commentLikes.findMany({
          where: {
            commentId: source.id
          },
          orderBy: { id: "desc" },
          take,
          skip
        });
      }
    });
    t.field(Comments.comments.name, {
      type: Comments.comments.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.comments.findMany({
          where: {
            commentId: source.id
          },
          orderBy: { id: "desc" },
          take,
          skip
        });
      }
    });
  }
});

const CommentsQueryType = extendType({
  type: "Query",
  definition(t) {
    t.field("getComments", {
      type: Comments.$name,
      args: {
        id: nonNull(intArg())
      },
      resolve(source, { id }, ctx) {
        return ctx.prisma.comments.findUnique({
          where: { id }
        });
      }
    });
}
});

export default [CommentsType, CommentsQueryType];
