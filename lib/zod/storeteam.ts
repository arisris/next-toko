import * as z from "zod"
import { CompleteStore, RelatedStoreModel, CompleteUser, RelatedUserModel } from "./index"

export const StoreTeamModel = z.object({
  id: z.number().int(),
  storeId: z.number().int(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteStoreTeam extends z.infer<typeof StoreTeamModel> {
  store: CompleteStore
  users: CompleteUser[]
}

/**
 * RelatedStoreTeamModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStoreTeamModel: z.ZodSchema<CompleteStoreTeam> = z.lazy(() => StoreTeamModel.extend({
  store: RelatedStoreModel,
  users: RelatedUserModel.array(),
}))
