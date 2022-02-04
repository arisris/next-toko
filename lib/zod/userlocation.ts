import * as z from "zod"

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
