import * as z from "zod"

export const CartItemModel = z.object({
  id: z.number().int(),
  cartId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int(),
})
