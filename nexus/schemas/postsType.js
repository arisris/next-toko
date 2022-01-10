import { extendType, intArg, nonNull, objectType } from "nexus";
import { Posts } from "nexus-prisma";
const postsType = objectType({
  name: Posts.$name,
  description: Posts.$description,
  definition(t) {
    t.field(Posts.id);
    t.field(Posts.name);
    t.field(Posts.type);
    t.field(Posts.body);
    t.field(Posts.createdAt);
    t.field(Posts.updatedAt);
  }
});
const queryType = extendType({
  type: "Query",
  definition(t) {
    t.field("getPost", {
      type: Posts.$name,
      args: {
        id: nonNull(intArg())
      },
      resolve(source, { id }, ctx) {
        return ctx.prisma.posts.findUnique({
          where: { id }
        });
      }
    });
  }
});

export default [postsType, queryType];
