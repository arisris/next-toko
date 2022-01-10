import { extendType, intArg, list, nonNull, objectType } from "nexus";
import { Users, Posts } from "nexus-prisma";

const usersType = objectType({
  name: Users.$name,
  description: Users.$description,
  definition(t) {
    t.field(Users.id);
    t.field(Users.name);
    t.field(Users.status);
    t.field(Users.email);
    t.field(Users.image);
    t.field(Users.phoneNumber);
    t.field(Users.createdAt);
    t.field(Users.updatedAt);
    t.field(Users.posts.name, {
      type: Users.posts.type,
      resolve(source, args, ctx) {
        return ctx.prisma.posts.findMany({
          where: {
            authorId: source.id
          },
          orderBy: { id: "desc" },
          take: 10
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
