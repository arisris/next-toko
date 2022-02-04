import * as z from "zod"
import { CompleteRole, RelatedRoleModel, CompleteUser, RelatedUserModel } from "./index"

export const PermissionModel = z.object({
  id: z.number().int(),
  name: z.string(),
  displayName: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompletePermission extends z.infer<typeof PermissionModel> {
  roles: CompleteRole[]
  users: CompleteUser[]
}

/**
 * RelatedPermissionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPermissionModel: z.ZodSchema<CompletePermission> = z.lazy(() => PermissionModel.extend({
  roles: RelatedRoleModel.array(),
  users: RelatedUserModel.array(),
}))
