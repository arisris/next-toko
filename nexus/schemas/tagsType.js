import { extendType, objectType, nonNull, intArg } from "nexus";
import { Tags } from "nexus-prisma";

const TagsType = objectType({
  name: Tags.$name,
  description: Tags.$description,
  definition(t) {
    t.field(Tags.id);
    t.field(Tags.type);
    t.field(Tags.name);
    t.field(Tags.description);
    t.field(Tags.posts.name, {
      type: Tags.posts.type,
      args: {
        take: intArg({ default: 5 }),
        skip: intArg({ default: 0 })
      },
      resolve(source, { take, skip }, ctx) {
        return ctx.prisma.posts.findMany({
          where: {
            tags: {
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

const TagsQueryType = extendType({
  type: "Query",
  definition(t) {
    t.field("getTags", {
      type: Tags.$name,
      args: {
        id: nonNull(intArg())
      },
      resolve(source, { id }, ctx) {
        return ctx.prisma.tags.findUnique({
          where: { id }
        });
      }
    });
}
});

export default [TagsType, TagsQueryType];
