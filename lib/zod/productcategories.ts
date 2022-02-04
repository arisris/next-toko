import * as z from "zod"

export const ProductCategoriesModel = z.object({
  id: z.number().int(),
  productCategoriesId: z.number().int().nullish(),
  name: z.string(),
  description: z.string(),
  image: z.string().nullish(),
  icon: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
