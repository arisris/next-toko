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
