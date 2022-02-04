import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteStoreFront, RelatedStoreFrontModel, CompleteStore, RelatedStoreModel, CompleteProductComments, RelatedProductCommentsModel, CompleteProductCategories, RelatedProductCategoriesModel, CompleteProductTags, RelatedProductTagsModel } from "./index"

export const ProductModel = z.object({
  id: z.number().int(),
  storeId: z.number().int(),
  authorId: z.number().int(),
  storeFrontId: z.number().int(),
  name: z.string(),
  description: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  author: CompleteUser
  storeFront: CompleteStoreFront
  store: CompleteStore
  productComments: CompleteProductComments[]
  productCategories: CompleteProductCategories[]
  productTags: CompleteProductTags[]
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModel.extend({
  author: RelatedUserModel,
  storeFront: RelatedStoreFrontModel,
  store: RelatedStoreModel,
  productComments: RelatedProductCommentsModel.array(),
  productCategories: RelatedProductCategoriesModel.array(),
  productTags: RelatedProductTagsModel.array(),
}))
