import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const CartModel = z.object({
  id: z.number().int(),
  userId: z.number().int(),
})

export interface CompleteCart extends z.infer<typeof CartModel> {
  user: CompleteUser
}

/**
 * RelatedCartModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCartModel: z.ZodSchema<CompleteCart> = z.lazy(() => CartModel.extend({
  user: RelatedUserModel,
}))
