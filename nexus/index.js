import path from "path";
import { asNexusMethod, enumType, makeSchema } from "nexus";
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
import categoriesType from "./schemas/categoriesType";
import commentLikeType from "./schemas/commentLikeType";
import commentsType from "./schemas/commentsType";
import postLikesType from "./schemas/postLikesType";
import productVariantsType from "./schemas/productVariantsType";
import socialAccountsType from "./schemas/socialAccountsType";
import tagsType from "./schemas/tagsType";
import walletMutationsType from "./schemas/walletMutationsType";
import walletType from "./schemas/walletType";

const registerEnum = [
  EnumUserStatus,
  EnumRole,
  EnumPostStatus,
  EnumPostType,
  EnumProductStatus,
  EnumCommentStatus,
  EnumWalletMutationType
].map(({ name, members }) => enumType({ name, members }));
const registerDateTimeScalar = asNexusMethod(DateTimeResolver, "DateTime");
export default function schema() {
  try {
    
    let build = makeSchema({
      types: [
        registerDateTimeScalar,
        ...registerEnum,
        ...usersType,
        ...postsType,
        ...categoriesType,
        ...commentsType,
        ...commentLikeType,
        ...postLikesType,
        ...productVariantsType,
        ...socialAccountsType,
        ...tagsType,
        ...walletMutationsType,
        ...walletType
      ],
      outputs: {
        schema: path.join(
          process.cwd(),
          "node_modules/@types/nexus-schema/schema.graphql"
        ),
        typegen: path.join(
          process.cwd(),
          "node_modules/@types/nexus-schema/index.d.ts"
        )
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
    return build;
  } catch (e) {
    console.error(e);
  }
}
