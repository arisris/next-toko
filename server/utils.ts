import { NextApiResponse, NextApiRequest, NextApiHandler } from "next";
import { ValidationError } from "yup";
import { getSession } from "next-auth/react";
import { ucWords } from "@/lib/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export const restAsyncHandler =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  (req: NextApiRequest, res: NextApiResponse) =>
    handler(req, res).catch((e: Error | string) => {
      if (e instanceof ValidationError) {
        return res.status(409).json({
          success: false,
          type: "validationError",
          path: e.path,
          errors: e.errors
        });
      }
      if (typeof e === "string") e = new Error(e);
      res.json({ success: false, msg: e.message });
    });

export const withSession = (handler: NextApiHandler) =>
  restAsyncHandler(async (req, res) => {
    const session = await getSession({ req });
    req.session = session;
    req.user = session?.user;
    return handler(req, res);
  });

export const errorFormater = ({ shape, error }) => {
  let yupError: {} | any;
  if (error.cause instanceof ValidationError) {
    yupError = {
      type: error.cause.type,
      path: error.cause.path,
      errors: error.cause.errors.map((i) => ucWords(i))
    };
  }
  if (error.cause instanceof PrismaClientKnownRequestError) {
    if (
      error.cause.message.includes("Unique constraint failed on the fields")
    ) {
      let path =
        error.cause.meta?.target && error.cause.meta?.target.length > 0
          ? error.cause.meta?.target[0]
          : undefined;
      yupError = {
        type: "",
        path: path,
        errors: [path ? ucWords(`${path} already exists`) : ""]
      };
    }
    shape.message = "Prisma Error";
  }
  return {
    ...shape,
    data: {
      ...shape.data,
      yupError
    }
  };
};
