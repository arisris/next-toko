import { t } from "@/server/trpc";
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

export const appRouter = t.router({
  user: userRouter,
  accounts: accountsRouter,
  membership: membershipRouter,
  role: roleRouter,
  permission: permissionRouter,
  store: storeRouter,
  storeTeam: storeTeamRouter,
  product: productRouter,
  storeFront: storeFrontRouter,
  productCategories: productCategoriesRouter,
  productTags: productTagsRouter,
  productComments: productCommentsRouter,
  dataCountry: dataCountryRouter,
  dataProvince: dataProvinceRouter,
  dataCity: dataCityRouter,
  dataDistrict: dataDistrictRouter,
  dataVillage: dataVillageRouter,
  storeLocation: storeLocationRouter,
  userLocation: userLocationRouter,
  dataBank: dataBankRouter,
  cart: cartRouter
});

export type AppRouter = typeof appRouter;
