import * as z from "zod"

export const DataCountryModel = z.object({
  id: z.number().int(),
  name: z.string(),
  lng: z.string().nullish(),
  lat: z.string().nullish(),
  icon: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
