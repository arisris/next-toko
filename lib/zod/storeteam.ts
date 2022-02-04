import * as z from "zod"

export const StoreTeamModel = z.object({
  id: z.number().int(),
  storeId: z.number().int(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
