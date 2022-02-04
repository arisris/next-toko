import * as z from "zod"
import { CompleteDataCity, RelatedDataCityModel, CompleteDataCountry, RelatedDataCountryModel, CompleteDataDistrict, RelatedDataDistrictModel, CompleteDataProvince, RelatedDataProvinceModel, CompleteUser, RelatedUserModel, CompleteDataVillage, RelatedDataVillageModel } from "./index"

export const UserLocationModel = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  countryId: z.number().int().nullish(),
  provinceId: z.number().int().nullish(),
  cityId: z.number().int().nullish(),
  districtId: z.number().int().nullish(),
  villageId: z.number().int().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteUserLocation extends z.infer<typeof UserLocationModel> {
  city?: CompleteDataCity | null
  country?: CompleteDataCountry | null
  district?: CompleteDataDistrict | null
  province?: CompleteDataProvince | null
  user: CompleteUser
  village?: CompleteDataVillage | null
}

/**
 * RelatedUserLocationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserLocationModel: z.ZodSchema<CompleteUserLocation> = z.lazy(() => UserLocationModel.extend({
  city: RelatedDataCityModel.nullish(),
  country: RelatedDataCountryModel.nullish(),
  district: RelatedDataDistrictModel.nullish(),
  province: RelatedDataProvinceModel.nullish(),
  user: RelatedUserModel,
  village: RelatedDataVillageModel.nullish(),
}))
