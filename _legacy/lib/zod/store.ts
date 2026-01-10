import * as z from "zod"

export const StoreModel = z.object({
  id: z.number().int(),
  ownerId: z.number().int(),
  name: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  description: z.string().nullish(),
})
