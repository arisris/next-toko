import * as z from "zod"

export const DataBankModel = z.object({
  id: z.number().int(),
  name: z.string(),
  type: z.string(),
  code: z.string(),
  address: z.string().nullish(),
  phone: z.string().nullish(),
  fax: z.string().nullish(),
  website: z.string().nullish(),
})
