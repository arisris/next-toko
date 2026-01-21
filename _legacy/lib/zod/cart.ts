import * as z from "zod"

export const CartModel = z.object({
  id: z.number().int(),
  userId: z.number().int(),
})
