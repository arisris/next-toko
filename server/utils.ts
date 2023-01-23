import { NextApiResponse, NextApiRequest, NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ZodError } from "zod";
import { Context } from "./context";
import { TRPCErrorShape } from "@trpc/server/rpc";
import { ErrorFormatter } from "@trpc/server/dist/error/formatter";

export const restAsyncHandler =
	(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
	(req: NextApiRequest, res: NextApiResponse) =>
		handler(req, res).catch((e: Error | string) => {
			if (e instanceof ZodError) {
				return res.status(409).json({
					success: false,
					type: "validationError",
					path: e.name,
					errors: e.errors,
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
		return handler(req, res) as never;
	});

export const errorFormater: ErrorFormatter<Context, TRPCErrorShape<number>> = ({
	shape,
	error,
}) => {
	let other: {} | unknown;
	if (error.cause instanceof ZodError) {
		other = {
			type: "validationError",
			name: error.cause.name,
			errors: error.cause.errors,
		};
	}
	if (error.cause instanceof PrismaClientKnownRequestError) {
		if (
			error.cause.message.includes("Unique constraint failed on the fields")
		) {
			other = {
				type: "prismaError",
				name: error.cause.message,
				errors: [error.cause.message],
			};
		}
		shape.message = "Prisma Error";
	}
	return {
		...shape,
		data: {
			...shape.data,
			other,
		},
	};
};
