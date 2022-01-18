import path from "path";
import { makeSchema, fieldAuthorizePlugin } from "nexus";
import allTypes from "./schemas/utilityTypes";
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
import { prismaNestedLists } from "./helpers";

function schema() {
  try {
    let build = makeSchema({
      types: [
        ...allTypes,
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
      plugins: [fieldAuthorizePlugin(), prismaNestedLists()],
      outputs: {
        schema: path.join(
          process.cwd(),
          "nexus/schema.graphql"
        ),
        typegen: path.join(
          process.cwd(),
          "nexus/nexus-prisma.d.ts"
        )
      },
      contextType: {
        module: path.resolve(path.join(process.cwd(), "types/global.d.ts")),
        export: "ContextTypeObject",
        alias: "ctx"
      },
      sourceTypes: {
        modules: [
          {
            module: path.resolve(
              path.join(process.cwd(), "node_modules/@prisma/client/index.d.ts")
            ),
            alias: "prisma"
          }
        ]
      }
    });
    return build;
  } catch (err) {
    throw err;
  }
}

export default schema();
