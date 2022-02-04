import * as z from "zod"
import { CompleteDataCity, RelatedDataCityModel, CompleteDataVillage, RelatedDataVillageModel, CompleteStoreLocation, RelatedStoreLocationModel, CompleteUserLocation, RelatedUserLocationModel } from "./index"

export const DataDistrictModel = z.object({
  id: z.number().int(),
  cityId: z.number().int().nullish(),
  name: z.string(),
  lng: z.string().nullish(),
  lat: z.string().nullish(),
  icon: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteDataDistrict extends z.infer<typeof DataDistrictModel> {
  city?: CompleteDataCity | null
  village: CompleteDataVillage[]
  storeLocation: CompleteStoreLocation[]
  userLocation: CompleteUserLocation[]
}

/**
 * RelatedDataDistrictModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDataDistrictModel: z.ZodSchema<CompleteDataDistrict> = z.lazy(() => DataDistrictModel.extend({
  city: RelatedDataCityModel.nullish(),
  village: RelatedDataVillageModel.array(),
  storeLocation: RelatedStoreLocationModel.array(),
  userLocation: RelatedUserLocationModel.array(),
}))
