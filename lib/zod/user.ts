import * as z from "zod"

export const UserModel = z.object({
  id: z.number().int(),
  name: z.string().nullish(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(32, { message: "Password must be sohortan 32 characters" }).nullish(),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  gender: z.string().nullish(),
  brithDate: z.date().nullish(),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }).nullish(),
  phoneVerified: z.date().nullish(),
  aboutMe: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  roleId: z.number().int().nullish(),
  membershipId: z.number().int().nullish(),
})
