import * as prettier from "prettier";
import { Prisma } from "@prisma/client";
import prisma from "../server/prisma";
import pkg from "../package.json";
import fs from "fs";
import path from "path";
import _ from "lodash";
import clsx from "clsx";

const modelName = _(Prisma.ModelName).map((i) => _.lowerFirst(i));
const dataModels = Prisma.dmmf.datamodel.models;
const dataEnums = Prisma.dmmf.datamodel.enums;

let output = `
/**
 * This is auto generated file
 **/
`;
let arr: { name: string; fileName: string; output: string }[] = [];

modelName.forEach((m) => {
	arr.push({
		name: m,
		fileName: `${m}Router.ts`,
		output: `import { Prisma, PrismaClient } from "@prisma/client";
    import { TRPCError } from "@trpc/server";
    import { ${_.upperFirst(m)}Model } from "@/lib/zod";
    import { t } from "@/server/trpc";
    import { z } from "zod";
		
		export const ${m}Router = t.router({
			store: t.procedure
				.input(
					z.object({
						data: ${_.upperFirst(m)}Model.omit({id: true})
					}).required()
				)
				.mutation(async ({ctx, input}) => {
					ctx.auth.mustBeReallyUser();
					let items = await ctx.prisma.${m}.create({
						// @ts-expect-error
						data: {
							// todo
						}
					});
					return items;
				}),
			update: t.procedure
				.input(
					z.object({
						id: z.number(),
						data:  ${_.upperFirst(m)}Model
					})
				)
				.mutation(async ({ctx, input}) => {
					ctx.auth.mustBeReallyUser();
					let items = await ctx.prisma.${m}.update({
						where: { id: input.id },
						data: {
							// todo
						}
					});
					return items;
				}),
			delete: t.procedure
				.input(
					z.object({
						id: z.number()
					})
				)
				.mutation(async ({ctx, input}) => {
					ctx.auth.mustBeReallyUser();
					let items = await ctx.prisma.${m}.delete({
						where: { id: input.id }
					});
					return items;
				}),
			all: t.procedure
				.input(
					z.object({
						search: z.string().nullish(),
						limit: z.number(),
						cursor: z.number()
					})
				)
				.query(async ({ctx, input}) => {
					let limit = input.limit ?? 10;
					let cursor = input.cursor;
					let where: Prisma.${_.upperFirst(m)}WhereInput | undefined;
					if (input.search) {
						// where.name = {
						//   contains: input.search
						// };
						// where.OR = {
						//   name: {
						//     startsWith: input.search
						//   }
						// };
					}
					let items = await ctx.prisma.${m}.findMany({
						take: limit + 1,
						cursor: cursor ? { id: cursor } : undefined,
						where
					});
					let next: typeof cursor | null = null;
					if (items.length > limit) {
						let nextItem = items.pop();
						next = nextItem!.id;
					}
					return { items, next };
				}),
			query: t.procedure
				.input(
					z.object({
						id: z.number()
					})
				)
				.query(async ({ctx, input}) => {
					let items = await ctx.prisma.${m}.findUnique({
						where: { id: input.id }
					});
					return items;
				})
		})
  `,
	});
});
let format = (i: string) =>
	prettier.format(i, { parser: "typescript", ...pkg.prettier });
try {
	const outputPath = path.join(process.cwd(), "/server/generated");
	let exists = fs.existsSync(outputPath);
	if (!exists) fs.mkdirSync(outputPath);

	for (let i of arr) {
		fs.writeFileSync(path.join(outputPath, i.fileName), format(i.output));
	}
	let indexs = `
  import { t } from "@/server/trpc";
  ${arr
		.map(
			(i) => `import { ${i.name}Router } from "./${i.name}Router";`,
		)
		.join("")}
	
	export const appRouter = t.router({
		${arr
			.map(
				(i) => `
		${i.name}: ${i.name}Router
		`,
			)
			.join(",")}
	});
	
	export type AppRouter = typeof appRouter;
  `;
	fs.writeFileSync(path.join(outputPath, "/_app.ts"), format(indexs));
} catch (e) {
	throw new Error(e.message);
}
