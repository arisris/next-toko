import { plugin } from "nexus";

export const prismaNestedLists = () => plugin({
  name: "prismaNestedLists",
  description: "Hello plugin",
  onCreateFieldResolver(c) {
    if (!c.fieldConfig.extensions.nexus.config) return;
    return async (source, args, ctx, info, next) => {
      //console.log("Before...")
      // @ts-expect-error
      const value = await next(source, args, ctx, info, next);
      //console.log("After...")
      return value;
    }
  }
});