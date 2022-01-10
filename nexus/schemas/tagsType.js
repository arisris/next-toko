import { extendType, objectType, nonNull, intArg } from "nexus";
import { Tags } from "nexus-prisma";

const TagsType = objectType({
  name: Tags.$name,
  description: Tags.$description,
  definition(t) {
    t.field(Tags.id);
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
