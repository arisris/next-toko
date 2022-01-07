const { PrismaClient, PostType, PostStatus } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const faker = require("faker");
const prisma = new PrismaClient();

async function main() {
  await prisma.categories.createMany({
    data: [
      {
        type: PostType.BLOGPOST,
        name: "Uncategorized"
      },
      {
        type: PostType.PRODUCT,
        name: "Uncategorized"
      }
    ]
  });
  await prisma.tags.createMany({
    data: [
      {
        type: PostType.BLOGPOST,
        name: "default"
      },
      {
        type: PostType.PRODUCT,
        name: "default"
      }
    ]
  });

  /** @returns {import("@prisma/client").Posts} */
  const createBlogPost = () => ({
    type: PostType.BLOGPOST,
    status: PostStatus.PUBLISH,
    name: faker.lorem.sentence(4),
    body: faker.lorem.paragraph(10),
    image: faker.image.fashion(640, 360)
  });

  /** @returns {import("@prisma/client").Posts} */
  const createProductPost = () => ({
    type: PostType.PRODUCT,
    status: PostStatus.PUBLISH,
    name: faker.lorem.sentence(4),
    body: faker.lorem.paragraph(10),
    image: faker.image.fashion(300, 300)
  });

  await prisma.posts.createMany({
    data: [
      ...Array(10).fill(null).map(createBlogPost),
      ...Array(10).fill(null).map(createProductPost)
    ]
  });

  const tags = await prisma.tags.findMany({
    where: { name: "default" },
    select: { id: true, type: true }
  });
  const categories = await prisma.categories.findMany({
    where: { name: "Uncategorized" },
    select: { id: true, type: true }
  });

  const blogPosts = await prisma.posts.findMany({
    where: { type: PostType.BLOGPOST },
    select: { id: true }
  });
  for (let { id } of blogPosts) {
    await prisma.posts.update({
      where: { id },
      data: {
        tags: {
          connect: tags
            .filter((t) => t.type === PostType.BLOGPOST)
            .map(({ id }) => ({ id }))
        },
        categories: {
          connect: categories
            .filter((t) => t.type === PostType.BLOGPOST)
            .map(({ id }) => ({ id }))
        }
      }
    });
  }

  const productPosts = await prisma.posts.findMany({
    where: { type: PostType.PRODUCT },
    select: { id: true }
  });
  for (let { id } of productPosts) {
    await prisma.posts.update({
      where: { id },
      data: {
        tags: {
          connect: tags
            .filter((t) => t.type === PostType.PRODUCT)
            .map(({ id }) => ({ id }))
        },
        categories: {
          connect: categories
            .filter((t) => t.type === PostType.PRODUCT)
            .map(({ id }) => ({ id }))
        }
      }
    });
  }

  await prisma.users.create({
    data: {
      username: "admin",
      email: "admin@example.net",
      password: bcrypt.hashSync("password123", 10),
      phoneNumber: "082240183482",
      posts: {
        connect: [
          ...blogPosts.map((i) => ({ id: i.id })),
          ...productPosts.map((i) => ({ id: i.id }))
        ]
      }
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
