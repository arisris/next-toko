import * as z from "zod"
import { CompleteProduct, RelatedProductModel } from "./index"

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

export interface CompleteProductCategories extends z.infer<typeof ProductCategoriesModel> {
  productCategories?: CompleteProductCategories | null
  subProductCategories: CompleteProductCategories[]
  products: CompleteProduct[]
}

/**
 * RelatedProductCategoriesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductCategoriesModel: z.ZodSchema<CompleteProductCategories> = z.lazy(() => ProductCategoriesModel.extend({
  productCategories: RelatedProductCategoriesModel.nullish(),
  subProductCategories: RelatedProductCategoriesModel.array(),
  products: RelatedProductModel.array(),
}))
