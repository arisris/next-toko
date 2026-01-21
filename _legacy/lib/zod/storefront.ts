import * as z from "zod"

export const StoreFrontModel = z.object({
  id: z.number().int(),
  storeId: z.number().int(),
  name: z.string(),
  description: z.string(),
  image: z.string().nullish(),
  icon: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
