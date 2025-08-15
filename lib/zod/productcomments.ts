import * as z from "zod"

export const ProductCommentsModel = z.object({
  id: z.number().int(),
  productId: z.number().int(),
  authorId: z.number().int(),
  productCommentsId: z.number().int().nullish(),
  type: z.string().nullish(),
  status: z.string().nullish(),
  rating: z.number().int().nullish(),
  description: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
