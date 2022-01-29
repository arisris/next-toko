import prisma from "../server/prisma";

async function main() {
  prisma.user.findMany();
}

main().catch((e) => {
  throw e;
});