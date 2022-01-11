import { extendType, intArg, nonNull, objectType } from "nexus";
import { Posts } from "nexus-prisma";
const postsType = objectType({
  name: Posts.$name,
  description: Posts.$description,
  definition(t) {
    t.field(Posts.id);
    t.field(Posts.type);
    t.field(Posts.status);
    t.field(Posts.name);
    t.field(Posts.image);
    t.field(Posts.body);
    t.field(Posts.createdAt);
    t.field(Posts.updatedAt);
    t.field(Posts.author);
    t.field(Posts.tags.name, {
      type: Posts.tags.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.tags.findMany({
          where: {
            posts: {
              some: {
                id: source.id
              }
            }
          },
          orderBy: { id: "desc" },
          take,
          skip
        });
      }
    });
    t.field(Posts.categories.name, {
      type: Posts.categories.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.categories.findMany({
          where: {
            posts: {
              some: {
                id: source.id
              }
            }
          },
          orderBy: { id: "desc" },
          take,
          skip
        });
      }
    });
    t.field(Posts.comments.name, {
      type: Posts.comments.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.comments.findMany({
          where: {
            postId: source.id
          },
          orderBy: { id: "desc" },
          take,
          skip
        });
      }
    });
    t.field(Posts.postLikes.name, {
      type: Posts.postLikes.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.postLikes.findMany({
          where: {
            postId: source.id
          },
          orderBy: { id: "desc" },
          take,
          skip
        });
      }
    });
    t.field(Posts.productVariants.name, {
      type: Posts.productVariants.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.productVariants.findMany({
          where: {
            productId: source.id
          },
          orderBy: { id: "desc" },
          take,
          skip
        });
      }
    });
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
