import { extendType, objectType, nonNull, intArg } from "nexus";
import { Permissions } from "nexus-prisma";

const PermissionsType = objectType({
  name: Permissions.$name,
  description: Permissions.$description,
  definition(t) {
    t.field(Permissions.id);
    t.field(Permissions.name);
    t.field(Permissions.description);
    t.field(Permissions.createdAt);
    t.field(Permissions.updatedAt);
    t.field(Permissions.roles.name, {
      type: Permissions.roles.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.roles.findMany({
          where: {
            permissions: {
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
  }
});

const PermissionsQueryType = extendType({
  type: "Query",
  definition(t) {
    t.field("getPermissions", {
      type: Permissions.$name,
      args: {
        id: nonNull(intArg())
      },
      resolve(source, { id }, ctx) {
        return ctx.prisma.permissions.findUnique({
          where: { id }
        });
      }
    });
}
});

export default [PermissionsType, PermissionsQueryType];
