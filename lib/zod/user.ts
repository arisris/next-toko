import * as z from "zod"
import { CompleteMembership, RelatedMembershipModel, CompleteRole, RelatedRoleModel, CompleteCart, RelatedCartModel, CompleteAccounts, RelatedAccountsModel, CompleteProduct, RelatedProductModel, CompleteProductComments, RelatedProductCommentsModel, CompleteStore, RelatedStoreModel, CompleteUserLocation, RelatedUserLocationModel, CompletePermission, RelatedPermissionModel, CompleteStoreTeam, RelatedStoreTeamModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  name: z.string().nullish(),
  password: z.string().nullish(),
  username: z.string(),
  email: z.string(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  gender: z.string().nullish(),
  brithDate: z.date().nullish(),
  phone: z.string().nullish(),
  phoneVerified: z.date().nullish(),
  aboutMe: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  roleId: z.number().int().nullish(),
  membershipId: z.number().int().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  membership?: CompleteMembership | null
  role?: CompleteRole | null
  cart: CompleteCart[]
  accounts: CompleteAccounts[]
  ownedProducts: CompleteProduct[]
  productComments: CompleteProductComments[]
  store?: CompleteStore | null
  userLocation: CompleteUserLocation[]
  permissions: CompletePermission[]
  storeTeams: CompleteStoreTeam[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  membership: RelatedMembershipModel.nullish(),
  role: RelatedRoleModel.nullish(),
  cart: RelatedCartModel.array(),
  accounts: RelatedAccountsModel.array(),
  ownedProducts: RelatedProductModel.array(),
  productComments: RelatedProductCommentsModel.array(),
  store: RelatedStoreModel.nullish(),
  userLocation: RelatedUserLocationModel.array(),
  permissions: RelatedPermissionModel.array(),
  storeTeams: RelatedStoreTeamModel.array(),
}))
