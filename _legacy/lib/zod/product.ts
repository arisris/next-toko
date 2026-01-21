import * as z from "zod"

export const ProductModel = z.object({
  id: z.number().int(),
  storeId: z.number().int(),
  authorId: z.number().int(),
  storeFrontId: z.number().int(),
  name: z.string(),
  description: z.string().nullish(),
  price: z.number(),
  stock: z.number().int(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
