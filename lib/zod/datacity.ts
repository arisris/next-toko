import * as z from "zod"
import { CompleteDataProvince, RelatedDataProvinceModel, CompleteDataDistrict, RelatedDataDistrictModel, CompleteStoreLocation, RelatedStoreLocationModel, CompleteUserLocation, RelatedUserLocationModel } from "./index"

export const DataCityModel = z.object({
  id: z.number().int(),
  provinceId: z.number().int().nullish(),
  name: z.string(),
  lng: z.string().nullish(),
  lat: z.string().nullish(),
  icon: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteDataCity extends z.infer<typeof DataCityModel> {
  province?: CompleteDataProvince | null
  district: CompleteDataDistrict[]
  storeLocation: CompleteStoreLocation[]
  userLocation: CompleteUserLocation[]
}

/**
 * RelatedDataCityModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDataCityModel: z.ZodSchema<CompleteDataCity> = z.lazy(() => DataCityModel.extend({
  province: RelatedDataProvinceModel.nullish(),
  district: RelatedDataDistrictModel.array(),
  storeLocation: RelatedStoreLocationModel.array(),
  userLocation: RelatedUserLocationModel.array(),
}))
