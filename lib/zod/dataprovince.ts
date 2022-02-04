import * as z from "zod"
import { CompleteDataCountry, RelatedDataCountryModel, CompleteDataCity, RelatedDataCityModel, CompleteStoreLocation, RelatedStoreLocationModel, CompleteUserLocation, RelatedUserLocationModel } from "./index"

export const DataProvinceModel = z.object({
  id: z.number().int(),
  countryId: z.number().int().nullish(),
  name: z.string(),
  lng: z.string().nullish(),
  lat: z.string().nullish(),
  icon: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteDataProvince extends z.infer<typeof DataProvinceModel> {
  country?: CompleteDataCountry | null
  city: CompleteDataCity[]
  storeLocation: CompleteStoreLocation[]
  userLocation: CompleteUserLocation[]
}

/**
 * RelatedDataProvinceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDataProvinceModel: z.ZodSchema<CompleteDataProvince> = z.lazy(() => DataProvinceModel.extend({
  country: RelatedDataCountryModel.nullish(),
  city: RelatedDataCityModel.array(),
  storeLocation: RelatedStoreLocationModel.array(),
  userLocation: RelatedUserLocationModel.array(),
}))
