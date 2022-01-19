import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ValidationError } from "yup";
import prisma from "./prisma";

export const getServerContext = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const context: ServerControllerProps = {
    req,
    res,
    session,
    prisma
  };
  return context;
};
export const handleController =
  (handler: ServerControllerHandler, isVoid: boolean = true) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const context = await getServerContext(req, res);
      const data = await handler(context);
      if (isVoid) {
        res.json({
          success: true,
          data
        });
      } else {
        return {
          success: true,
          data
        };
      }
    } catch (e) {
      let err: Record<any, any>;
      if (e instanceof ValidationError) {
        err = {
          success: false,
          type: "validationError",
          path: e.path,
          errors: e.errors
        };
      } else if (typeof e === "string") {
        err = { success: false, msg: e };
      } else {
        err = { success: false, msg: e.message };
      }
      if (isVoid) {
        res.json(err);
      } else {
        return err;
      }
    }
  };
