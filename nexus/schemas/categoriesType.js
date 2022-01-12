import { extendType, objectType, nonNull, intArg } from "nexus";
import { Categories } from "nexus-prisma";

const CategoriesType = objectType({
  name: Categories.$name,
  description: Categories.$description,
  definition(t) {
    t.field(Categories.id);
    t.field(Categories.type);
    t.field(Categories.name);
    t.field(Categories.description);
    t.field(Categories.createdAt);
    t.field(Categories.updatedAt);
    t.field(Categories.posts.name, {
      type: Categories.posts.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.posts.findMany({
          where: {
            categories: {
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

const CategoriesQueryType = extendType({
  type: "Query",
  definition(t) {
    t.field("getCategories", {
      type: Categories.$name,
      args: {
        id: nonNull(intArg())
      },
      resolve(source, { id }, ctx) {
        return ctx.prisma.categories.findUnique({
          where: { id }
        });
      }
    });
  }
});

export default [CategoriesType, CategoriesQueryType];
