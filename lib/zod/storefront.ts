import * as z from "zod"
import { CompleteStore, RelatedStoreModel, CompleteProduct, RelatedProductModel } from "./index"

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

export interface CompleteStoreFront extends z.infer<typeof StoreFrontModel> {
  store: CompleteStore
  products: CompleteProduct[]
}

/**
 * RelatedStoreFrontModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStoreFrontModel: z.ZodSchema<CompleteStoreFront> = z.lazy(() => StoreFrontModel.extend({
  store: RelatedStoreModel,
  products: RelatedProductModel.array(),
}))
