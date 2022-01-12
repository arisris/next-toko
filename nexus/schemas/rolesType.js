import { extendType, objectType, nonNull, intArg } from "nexus";
import { Roles } from "nexus-prisma";

const RolesType = objectType({
  name: Roles.$name,
  description: Roles.$description,
  definition(t) {
    t.field(Roles.id);
    t.field(Roles.name);
    t.field(Roles.description);
    t.field(Roles.createdAt);
    t.field(Roles.updatedAt);
    t.field(Roles.permissions.name, {
      type: Roles.permissions.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.permissions.findMany({
          where: {
            roles: {
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

const RolesQueryType = extendType({
  type: "Query",
  definition(t) {
    t.field("getRoles", {
      type: Roles.$name,
      args: {
        id: nonNull(intArg())
      },
      resolve(source, { id }, ctx) {
        return ctx.prisma.roles.findUnique({
          where: { id }
        });
      }
    });
}
});

export default [RolesType, RolesQueryType];
