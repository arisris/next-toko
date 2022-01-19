import { hash } from "bcryptjs";
import * as yup from "yup";

export const register: ServerControllerHandler = async ({ req, prisma }) => {
  if (req.user) throw "Already LoggedIn";
  const userSchema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).max(32).required(),
      password_confirmation: yup
        .string()
        .equals([yup.ref("password"), null], "Password Is Not Match")
    })
    .nullable();
  const value = await userSchema.validate(req.body);
  if (value) {
    delete value.password_confirmation;
    value.password = await hash(value.password, 10);
    const registered = await prisma.users.create({
      data: value
    });
    if (registered) return { success: true, msg: "User Registered" };
  }
  throw "Something Error";
};
