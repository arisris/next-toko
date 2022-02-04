import * as z from "zod"
import { CompleteDataDistrict, RelatedDataDistrictModel, CompleteStoreLocation, RelatedStoreLocationModel, CompleteUserLocation, RelatedUserLocationModel } from "./index"

export const DataVillageModel = z.object({
  id: z.number().int(),
  districtId: z.number().int().nullish(),
  name: z.string(),
  lng: z.string().nullish(),
  lat: z.string().nullish(),
  icon: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteDataVillage extends z.infer<typeof DataVillageModel> {
  district?: CompleteDataDistrict | null
  storeLocation: CompleteStoreLocation[]
  userLocation: CompleteUserLocation[]
}

/**
 * RelatedDataVillageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDataVillageModel: z.ZodSchema<CompleteDataVillage> = z.lazy(() => DataVillageModel.extend({
  district: RelatedDataDistrictModel.nullish(),
  storeLocation: RelatedStoreLocationModel.array(),
  userLocation: RelatedUserLocationModel.array(),
}))
