import * as z from "zod"

export const MembershipModel = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullish(),
  pricing: z.string().nullish(),
  isActive: z.boolean().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
