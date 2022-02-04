import * as z from "zod"
import { CompleteDataProvince, RelatedDataProvinceModel, CompleteStoreLocation, RelatedStoreLocationModel, CompleteUserLocation, RelatedUserLocationModel } from "./index"

export const DataCountryModel = z.object({
  id: z.number().int(),
  name: z.string(),
  lng: z.string().nullish(),
  lat: z.string().nullish(),
  icon: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteDataCountry extends z.infer<typeof DataCountryModel> {
  province: CompleteDataProvince[]
  storeLocation: CompleteStoreLocation[]
  userLocation: CompleteUserLocation[]
}

/**
 * RelatedDataCountryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDataCountryModel: z.ZodSchema<CompleteDataCountry> = z.lazy(() => DataCountryModel.extend({
  province: RelatedDataProvinceModel.array(),
  storeLocation: RelatedStoreLocationModel.array(),
  userLocation: RelatedUserLocationModel.array(),
}))
