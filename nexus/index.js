import path from "path";
import {
  asNexusMethod,
  enumType,
  makeSchema,
} from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import {
  EnumCommentStatus,
  EnumPostStatus,
  EnumPostType,
  EnumProductStatus,
  EnumRole,
  EnumUserStatus,
  EnumWalletMutationType
} from "nexus-prisma";
import postsType from "./schemas/postsType";
import usersType from "./schemas/usersType";

const registerDateTimeScalar = asNexusMethod(DateTimeResolver, "DateTime");
const registerEnum = [
  EnumUserStatus,
  EnumRole,
  EnumPostStatus,
  EnumPostType,
  EnumProductStatus,
  EnumCommentStatus,
  EnumWalletMutationType
].map(({ name, members }) => enumType({ name, members }));

export default makeSchema({
  types: [
    registerDateTimeScalar,
    ...registerEnum,
    ...usersType,
    ...postsType
  ],
  outputs: {
    schema: path.join(process.cwd(), "node_modules/@types/nexus-schema/schema.graphql"),
    typegen: path.join(process.cwd(), "node_modules/@types/nexus-schema/index.d.ts")
  },
  contextType: {
    module: path.resolve(path.join(process.cwd(), "global.d.ts")),
    export: "ContextTypeObject",
    alias: "ctx"
  },
  sourceTypes: {
    modules: [
      {
        module: path.resolve(
          path.join(process.cwd(), "node_modules/.prisma/client/index.d.ts")
        ),
        alias: "prisma"
      }
    ]
  }
});
