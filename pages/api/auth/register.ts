import prisma from "@/libs/prisma";
import { withSession } from "@/libs/withSession";
import { hash } from "bcryptjs";
import { NextApiHandler } from "next";
import * as yup from "yup";

const handler: NextApiHandler = async (req, res) => {
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
    const registerd = await prisma.users.create({
      data: value
    });
    if (registerd) return res.json({ success: true, msg: "User Registered" });
  }
  res.json({ success: false, msg: "Something Error" });
};

export default withSession(handler);
