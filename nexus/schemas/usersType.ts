import { EnumPostType } from "@prisma/client";
import { hash } from "bcryptjs";
import {
  extendType,
  intArg,
  nonNull,
  objectType,
  stringArg
} from "nexus";
import { Users } from "nexus-prisma";

const UsersType = objectType({
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
    // t.field(Users.password.name, {
    //   type: Users.password.type,
    //   authorize: async (_, __, ctx) => {
    //     return ctx.can("manage:anything");
    //     return false;
    //   }
    // });
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

const MutationType = extendType({
  type: "Mutation",
  definition(t) {
    t.field("registerUser", {
      type: "RestResponse",
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        password_conf: nonNull(stringArg())
      },
      async resolve(_, { name, email, password, password_conf }, ctx) {
        if (password !== password_conf)
          throw new Error("Password confirmation does't not match");
        password = await hash(password, 10);
        const user = await ctx.prisma.users.create({
          data: {
            name,
            password,
            email
          }
        });
        if (!user) throw new Error("Registratio failed");
        return {
          type: "SUCCESS",
          message: "New User Created!"
        };
      }
    });
  }
});

const QueryType = extendType({
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

export default [UsersType, QueryType, MutationType];
