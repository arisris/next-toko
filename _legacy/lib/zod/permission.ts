import * as z from "zod"

export const PermissionModel = z.object({
  id: z.number().int(),
  name: z.string(),
  displayName: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
