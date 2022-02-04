import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteProduct, RelatedProductModel, CompleteStoreFront, RelatedStoreFrontModel, CompleteStoreLocation, RelatedStoreLocationModel, CompleteStoreTeam, RelatedStoreTeamModel } from "./index"

export const StoreModel = z.object({
  id: z.number().int(),
  ownerId: z.number().int(),
  name: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  description: z.string().nullish(),
})

export interface CompleteStore extends z.infer<typeof StoreModel> {
  owner: CompleteUser
  products: CompleteProduct[]
  storeFront: CompleteStoreFront[]
  storeLocation: CompleteStoreLocation[]
  teams: CompleteStoreTeam[]
}

/**
 * RelatedStoreModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStoreModel: z.ZodSchema<CompleteStore> = z.lazy(() => StoreModel.extend({
  owner: RelatedUserModel,
  products: RelatedProductModel.array(),
  storeFront: RelatedStoreFrontModel.array(),
  storeLocation: RelatedStoreLocationModel.array(),
  teams: RelatedStoreTeamModel.array(),
}))
