import * as z from "zod"
import { CompleteDataCity, RelatedDataCityModel, CompleteDataCountry, RelatedDataCountryModel, CompleteDataDistrict, RelatedDataDistrictModel, CompleteDataProvince, RelatedDataProvinceModel, CompleteStore, RelatedStoreModel, CompleteDataVillage, RelatedDataVillageModel } from "./index"

export const StoreLocationModel = z.object({
  id: z.number().int(),
  storeId: z.number().int(),
  countryId: z.number().int().nullish(),
  provinceId: z.number().int().nullish(),
  cityId: z.number().int().nullish(),
  districtId: z.number().int().nullish(),
  villageId: z.number().int().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteStoreLocation extends z.infer<typeof StoreLocationModel> {
  city?: CompleteDataCity | null
  country?: CompleteDataCountry | null
  district?: CompleteDataDistrict | null
  province?: CompleteDataProvince | null
  store: CompleteStore
  village?: CompleteDataVillage | null
}

/**
 * RelatedStoreLocationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStoreLocationModel: z.ZodSchema<CompleteStoreLocation> = z.lazy(() => StoreLocationModel.extend({
  city: RelatedDataCityModel.nullish(),
  country: RelatedDataCountryModel.nullish(),
  district: RelatedDataDistrictModel.nullish(),
  province: RelatedDataProvinceModel.nullish(),
  store: RelatedStoreModel,
  village: RelatedDataVillageModel.nullish(),
}))
