import { extendType, objectType, nonNull, intArg } from "nexus";
import { Categories } from "nexus-prisma";

const CategoriesType = objectType({
  name: Categories.$name,
  description: Categories.$description,
  definition(t) {
    t.field(Categories.id);
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
