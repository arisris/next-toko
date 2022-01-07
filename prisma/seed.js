const {
  PrismaClient,
  EnumPostType,
  EnumPostStatus,
  EnumRole
} = require("@prisma/client");
const bcrypt = require("bcryptjs");
const faker = require("faker");
const prisma = new PrismaClient();

const mapId = ({ id }) => ({ id });
const filterBlogPostType = ({ type }) => type === EnumPostType.BLOGPOST;
const filterProductPostType = ({ type }) => type === EnumPostType.PRODUCT;

/** @returns {import("@prisma/client").Posts} */
const createBlogPost = () => ({
  type: EnumPostType.BLOGPOST,
  status: EnumPostStatus.PUBLISH,
  name: faker.lorem.sentence(4),
  body: faker.lorem.paragraph(10),
  image: faker.image.fashion(640, 360)
});

/** @returns {import("@prisma/client").Posts} */
const createProductPost = () => ({
  type: EnumPostType.PRODUCT,
  status: EnumPostStatus.PUBLISH,
  name: faker.lorem.sentence(4),
  body: faker.lorem.paragraph(10),
  image: faker.image.fashion(300, 300)
});

async function main() {
  await prisma.categories.createMany({
    data: [
      {
        type: EnumPostType.BLOGPOST,
        name: "Uncategorized"
      },
      {
        type: EnumPostType.PRODUCT,
        name: "Uncategorized"
      }
    ]
  });
  await prisma.tags.createMany({
    data: [
      {
        type: EnumPostType.BLOGPOST,
        name: "default"
      },
      {
        type: EnumPostType.PRODUCT,
        name: "default"
      }
    ]
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
    where: { type: EnumPostType.BLOGPOST },
    select: { id: true }
  });
  for (let { id } of blogPosts) {
    await prisma.posts.update({
      where: { id },
      data: {
        tags: {
          connect: tags.filter(filterBlogPostType).map(mapId)
        },
        categories: {
          connect: categories.filter(filterBlogPostType).map(mapId)
        }
      }
    });
  }

  const productPosts = await prisma.posts.findMany({
    where: { type: EnumPostType.PRODUCT },
    select: { id: true }
  });
  for (let { id } of productPosts) {
    await prisma.posts.update({
      where: { id },
      data: {
        tags: {
          connect: tags.filter(filterProductPostType).map(mapId)
        },
        categories: {
          connect: categories.filter(filterProductPostType).map(mapId)
        }
      }
    });
  }

  // create admin and assign it example posts
  await prisma.users.create({
    data: {
      name: "admin",
      email: "admin@example.net",
      password: bcrypt.hashSync("password123", 10),
      phoneNumber: "082240183482",
      role: EnumRole.ADMIN,
      posts: {
        connect: [...blogPosts.map(mapId), ...productPosts.map(mapId)]
      }
    }
  });
}

// run the seed Promise
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
