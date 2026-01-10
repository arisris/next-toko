import * as z from "zod"

export const RoleModel = z.object({
  id: z.number().int(),
  name: z.string(),
  displayName: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
