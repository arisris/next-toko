import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const AccountsModel = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  refresh_token_expires_in: z.number().int().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().int().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
  oauth_token_secret: z.string().nullish(),
  oauth_token: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteAccounts extends z.infer<typeof AccountsModel> {
  user: CompleteUser
}

/**
 * RelatedAccountsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAccountsModel: z.ZodSchema<CompleteAccounts> = z.lazy(() => AccountsModel.extend({
  user: RelatedUserModel,
}))
