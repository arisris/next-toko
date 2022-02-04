import * as z from "zod"
import { ProductCommentsType, ProductCommentsStatus } from "@prisma/client"

export const ProductCommentsModel = z.object({
  id: z.number().int(),
  productId: z.number().int(),
  authorId: z.number().int(),
  productCommentsId: z.number().int().nullish(),
  type: z.nativeEnum(ProductCommentsType).nullish(),
  status: z.nativeEnum(ProductCommentsStatus).nullish(),
  rating: z.number().int().nullish(),
  description: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
