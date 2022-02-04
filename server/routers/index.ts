import superjson from "superjson";
import { createRouter } from "@/server/createRouter";
import { errorFormater } from "@/server/utils";

import { userRouter } from "./userRouter";

import { accountsRouter } from "./accountsRouter";

import { membershipRouter } from "./membershipRouter";

import { roleRouter } from "./roleRouter";

import { permissionRouter } from "./permissionRouter";

import { storeRouter } from "./storeRouter";

import { storeTeamRouter } from "./storeTeamRouter";

import { productRouter } from "./productRouter";

import { storeFrontRouter } from "./storeFrontRouter";

import { productCategoriesRouter } from "./productCategoriesRouter";

import { productTagsRouter } from "./productTagsRouter";

import { productCommentsRouter } from "./productCommentsRouter";

import { dataCountryRouter } from "./dataCountryRouter";

import { dataProvinceRouter } from "./dataProvinceRouter";

import { dataCityRouter } from "./dataCityRouter";

import { dataDistrictRouter } from "./dataDistrictRouter";

import { dataVillageRouter } from "./dataVillageRouter";

import { storeLocationRouter } from "./storeLocationRouter";

import { userLocationRouter } from "./userLocationRouter";

import { dataBankRouter } from "./dataBankRouter";

import { cartRouter } from "./cartRouter";

export const appRouter = createRouter()
  .formatError(errorFormater)
  .transformer(superjson)
  // .middleware(async ({ ctx, next }) => {
  //   return next();
  // })

  .merge("user.", userRouter)

  .merge("accounts.", accountsRouter)

  .merge("membership.", membershipRouter)

  .merge("role.", roleRouter)

  .merge("permission.", permissionRouter)

  .merge("store.", storeRouter)

  .merge("storeTeam.", storeTeamRouter)

  .merge("product.", productRouter)

  .merge("storeFront.", storeFrontRouter)

  .merge("productCategories.", productCategoriesRouter)

  .merge("productTags.", productTagsRouter)

  .merge("productComments.", productCommentsRouter)

  .merge("dataCountry.", dataCountryRouter)

  .merge("dataProvince.", dataProvinceRouter)

  .merge("dataCity.", dataCityRouter)

  .merge("dataDistrict.", dataDistrictRouter)

  .merge("dataVillage.", dataVillageRouter)

  .merge("storeLocation.", storeLocationRouter)

  .merge("userLocation.", userLocationRouter)

  .merge("dataBank.", dataBankRouter)

  .merge("cart.", cartRouter);

export type AppRouter = typeof appRouter;
