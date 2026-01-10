import * as z from "zod"

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
