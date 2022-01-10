import { extendType, objectType, nonNull, intArg } from "nexus";
import { Comments } from "nexus-prisma";

const CommentsType = objectType({
  name: Comments.$name,
  description: Comments.$description,
  definition(t) {
    t.field(Comments.id);
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
