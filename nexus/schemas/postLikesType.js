import { extendType, objectType, nonNull, intArg } from "nexus";
import { PostLikes } from "nexus-prisma";

const PostLikesType = objectType({
  name: PostLikes.$name,
  description: PostLikes.$description,
  definition(t) {
    t.field(PostLikes.id);
  }
});

const PostLikesQueryType = extendType({
  type: "Query",
  definition(t) {
    t.field("getPostLikes", {
      type: PostLikes.$name,
      args: {
        id: nonNull(intArg())
      },
      resolve(source, { id }, ctx) {
        return ctx.prisma.postLikes.findUnique({
          where: { id }
        });
      }
    });
}
});

export default [PostLikesType, PostLikesQueryType];
