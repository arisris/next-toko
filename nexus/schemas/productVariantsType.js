import { extendType, objectType, nonNull, intArg } from "nexus";
import { ProductVariants } from "nexus-prisma";

const ProductVariantsType = objectType({
  name: ProductVariants.$name,
  description: ProductVariants.$description,
  definition(t) {
    t.field(ProductVariants.id);
    t.field(ProductVariants.type);
    t.field(ProductVariants.status);
    t.field(ProductVariants.isMain);
    t.field(ProductVariants.name);
    t.field(ProductVariants.description);
    t.field(ProductVariants.price);
    t.field(ProductVariants.stock);
    t.field(ProductVariants.image);
    t.field(ProductVariants.products);
  }
});

const ProductVariantsQueryType = extendType({
  type: "Query",
  definition(t) {
    t.field("getProductVariants", {
      type: ProductVariants.$name,
      args: {
        id: nonNull(intArg())
      },
      resolve(source, { id }, ctx) {
        return ctx.prisma.productVariants.findUnique({
          where: { id }
        });
      }
    });
}
});

export default [ProductVariantsType, ProductVariantsQueryType];
