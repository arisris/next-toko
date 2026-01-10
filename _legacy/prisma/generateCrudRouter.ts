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
    import { createRouter } from "@/server/createRouter";
    import { z } from "zod";
    export const ${m}Router = createRouter()
    .mutation("store", {
      input: z.object({
        data: ${_.upperFirst(m)}Model.omit({id: true})
      }).required(),
      async resolve({ ctx, input }) {
        ctx.auth.mustBeReallyUser();
        let items = await ctx.prisma.${m}.create({
          // @ts-expect-error
          data: {
            // todo
          }
        });
        return items;
      }
    })
    .mutation("update", {
      input: z.object({
        id: z.number(),
        data:  ${_.upperFirst(m)}Model
      }),
      async resolve({ ctx, input }) {
        ctx.auth.mustBeReallyUser();
        let items = await ctx.prisma.${m}.update({
          where: { id: input.id },
          data: {
            // todo
          }
        });
        return items;
      }
    })
    .mutation("destroy", {
      input: z.object({
        id: z.number()
      }),
      async resolve({ ctx, input }) {
        ctx.auth.mustBeReallyUser();
        let items = await ctx.prisma.${m}.delete({
          where: { id: input.id }
        });
        return items;
      }
    })
    .query("all", {
      input: z.object({
        search: z.string().nullish(),
        limit: z.number(),
        cursor: z.number()
      }),
      async resolve({ ctx, input }) {
        let limit = input.limit ?? 10;
        let cursor = input.cursor;
        let where: Prisma.${_.upperFirst(m)}WhereInput;
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
      }
    })
    .query("byId", {
      input: z.object({
        id: z.number()
      }),
      async resolve({ ctx, input }) {
        let items = await ctx.prisma.${m}.findUnique({
          where: { id: input.id }
        });
        return items;
      }
    });
  `
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
  import superjson from "superjson";
  import { createRouter } from "@/server/createRouter";
  import { errorFormater } from "@/server/utils";
  ${arr
    .map(
      (i) => `
  import { ${i.name}Router } from "./${i.name}Router"
  `
    )
    .join("")}
  
  export const appRouter = createRouter()
    .formatError(errorFormater)
    .transformer(superjson)
    // .middleware(async ({ ctx, next }) => {
    //   return next();
    // })
    ${arr
      .map(
        (i) => `
    .merge("${i.name}.", ${i.name}Router)
    `
      )
      .join("")}
  
  export type AppRouter = typeof appRouter;
  `;
  fs.writeFileSync(path.join(outputPath, "/index.ts"), format(indexs));
} catch (e) {
  throw new Error(e.message);
}
