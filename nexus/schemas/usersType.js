import { EnumPostType } from "@prisma/client";
import { extendType, intArg, nonNull, objectType } from "nexus";
import { Users, Posts } from "nexus-prisma";

const usersType = objectType({
  name: Users.$name,
  description: Users.$description,
  definition(t) {
    t.field(Users.id);
    t.field(Users.role);
    t.field(Users.name);
    t.field(Users.status);
    t.field(Users.email);
    t.field(Users.emailVerified);
    t.field(Users.image);
    t.field(Users.phoneNumber);
    t.field(Users.createdAt);
    t.field(Users.updatedAt);
    t.field(Users.password.name, {
      type: Users.password.type,
      authorize: async () => false
    });
    t.field(Users.wallet);
    t.field("latestPosts", {
      type: Users.posts.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.posts.findMany({
          where: {
            authorId: source.id,
            type: EnumPostType.BLOGPOST
          },
          orderBy: { id: "desc" },
          take,
          skip
        });
      }
    });
    t.field("latestProducts", {
      type: Users.posts.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.posts.findMany({
          where: {
            authorId: source.id,
            type: EnumPostType.PRODUCT
          },
          orderBy: { id: "desc" },
          take,
          skip
        });
      }
    });
    t.field(Users.socialAccounts.name, {
      type: Users.socialAccounts.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.socialAccounts.findMany({
          where: {
            userId: source.id
          },
          orderBy: { id: "desc" },
          take,
          skip
        });
      }
    });
    t.field(Users.comments.name, {
      type: Users.comments.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.comments.findMany({
          where: {
            authorId: source.id
          },
          orderBy: { id: "desc" },
          take,
          skip
        });
      }
    });
    t.field(Users.commentLikes.name, {
      type: Users.commentLikes.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.commentLikes.findMany({
          where: {
            authorId: source.id
          },
          orderBy: { id: "desc" },
          take,
          skip
        });
      }
    });
    t.field(Users.postLikes.name, {
      type: Users.postLikes.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.postLikes.findMany({
          where: {
            authorId: source.id
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
    t.field("getUser", {
      type: Users.$name,
      args: {
        id: nonNull(intArg())
      },
      resolve(source, { id }, ctx) {
        return ctx.prisma.users.findUnique({
          where: { id }
        });
      }
    });
  }
});

export default [usersType, queryType];
