import * as z from "zod"
import { ProductCommentsType, ProductCommentsStatus } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteProduct, RelatedProductModel } from "./index"

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

export interface CompleteProductComments extends z.infer<typeof ProductCommentsModel> {
  author: CompleteUser
  productComments?: CompleteProductComments | null
  product: CompleteProduct
  comments: CompleteProductComments[]
}

/**
 * RelatedProductCommentsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductCommentsModel: z.ZodSchema<CompleteProductComments> = z.lazy(() => ProductCommentsModel.extend({
  author: RelatedUserModel,
  productComments: RelatedProductCommentsModel.nullish(),
  product: RelatedProductModel,
  comments: RelatedProductCommentsModel.array(),
}))
