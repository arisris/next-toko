import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompletePermission, RelatedPermissionModel } from "./index"

export const RoleModel = z.object({
  id: z.number().int(),
  name: z.string(),
  displayName: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteRole extends z.infer<typeof RoleModel> {
  users: CompleteUser[]
  permissions: CompletePermission[]
}

/**
 * RelatedRoleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRoleModel: z.ZodSchema<CompleteRole> = z.lazy(() => RoleModel.extend({
  users: RelatedUserModel.array(),
  permissions: RelatedPermissionModel.array(),
}))
