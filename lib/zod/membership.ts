import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const MembershipModel = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullish(),
  pricing: z.string().nullish(),
  isActive: z.boolean().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteMembership extends z.infer<typeof MembershipModel> {
  users: CompleteUser[]
}

/**
 * RelatedMembershipModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMembershipModel: z.ZodSchema<CompleteMembership> = z.lazy(() => MembershipModel.extend({
  users: RelatedUserModel.array(),
}))
