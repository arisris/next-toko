import {
  EnumPostStatus,
  EnumPostType,
  EnumProductStatus,
  EnumUserStatus,
  PrismaClient
} from "@prisma/client";
import { hash } from "bcryptjs";
import * as faker from "faker";

const prisma = new PrismaClient();

const mapId = ({ id }) => ({ id });

// this is simple
const userPermissions = {
  user: ["manage:ownPosts"],
  seller: ["manage:ownProducts", "manage:ownPosts"],
  admin: ["manage:anything"]
};
const permissionsName = Object.values(userPermissions)
  .reduce((a, b) => (a.push(...b), a), [])
  .filter((a, i, u) => i === u.indexOf(a));

//process.exit();

// blog & products

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
  name: faker.commerce.productName(),
  body: faker.commerce.productDescription(),
  image: faker.image.fashion(300, 300)
});

/** @returns {import("@prisma/client").ProductVariants} */
const createProductVariants = () => ({
  type: faker.commerce.productAdjective(),
  status: EnumProductStatus.AVAILABLE,
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  image: faker.image.fashion(300, 300),
  price: Math.abs(Number(faker.commerce.price())),
  stock: faker.datatype.number(100)
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
        },
        productVariants: {
          createMany: {
            data: Array(6)
              .fill(null)
              .map(() => createProductVariants()),
            skipDuplicates: true
          }
        }
      }
    });
  }

  const wallet = await prisma.wallet.create({
    data: {
      amount: 1000,
      isVerified: true,
      verifiedAt: new Date()
    }
  });

  for (let permission of permissionsName) {
    await prisma.permissions.create({
      data: {
        name: permission
      }
    });
  }

  for (let role of Object.keys(userPermissions)) {
    await prisma.roles.create({
      data: {
        name: role,
        permissions: {
          connect: userPermissions[role].map((name) => ({ name }))
        }
      }
    });
  }

  // create admin and assign it example posts
  await prisma.users.create({
    data: {
      name: "admin",
      email: "admin@example.net",
      password: await hash("password123", 10),
      status: EnumUserStatus.ACTIVE,
      phoneNumber: "081234567890",
      role: {
        connect: { name: "admin" }
      },
      emailVerified: true,
      posts: {
        connect: [...blogPosts.map(mapId), ...productPosts.map(mapId)]
      },
      wallet: {
        connect: { id: wallet.id }
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
