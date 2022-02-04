import * as z from "zod"
import { CompleteProduct, RelatedProductModel } from "./index"

export const ProductTagsModel = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  image: z.string().nullish(),
  icon: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteProductTags extends z.infer<typeof ProductTagsModel> {
  products: CompleteProduct[]
}

/**
 * RelatedProductTagsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductTagsModel: z.ZodSchema<CompleteProductTags> = z.lazy(() => ProductTagsModel.extend({
  products: RelatedProductModel.array(),
}))
