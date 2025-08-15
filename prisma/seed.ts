import prisma from "../server/prisma";
import crypto from "crypto";
import faker from "faker";
import { fakeArray } from "../lib/utils";
import { hashSync } from "bcryptjs";
import { Role } from "../store/enums";
import { Prisma } from "@prisma/client";

async function createUser() {
	const admin = await prisma.user.create({
		data: {
			name: "Admin",
			username: "admin",
			email: "admin@example.net",
			password: hashSync("password123", 10),
			emailVerified: new Date(),
			image: `https://0.gravatar.com/avatar/${crypto
				.createHash("md5")
				.update("admin@example.net")
				.digest("hex")}`,
		},
	});
	const fakeUser = (): Prisma.UserCreateInput => ({
		name: `${faker.name.firstName()} ${faker.name.lastName()}`,
		username: faker.internet.userName(),
		email: faker.internet.email(),
		password: hashSync("password", 10),
		emailVerified: new Date(),
		image: `https://0.gravatar.com/avatar/${crypto
			.createHash("md5")
			.update(faker.internet.email())
			.digest("hex")}`,
	});
	const usersData = fakeArray(5).map(() => fakeUser());
	const users = [];
	for (const userData of usersData) {
		const user = await prisma.user.create({ data: userData });
		users.push(user);
	}
	return {
		admin,
		users,
	};
}

async function createPermissionRole(users) {
	const roles = [
		{
			name: Role.ADMIN,
			displayName: "Admin",
		},
		{
			name: Role.USER,
			displayName: "User",
		},
	];
	for (const role of roles) {
		await prisma.role.create({ data: role });
	}
	await prisma.user.update({
		where: { id: users.admin.id },
		data: {
			role: {
				connect: {
					name: Role.ADMIN,
				},
			},
		},
	});
	await prisma.user.updateMany({
		where: { roleId: null },
		data: {
			roleId: (await prisma.role.findUnique({ where: { name: Role.USER } })).id,
		},
	});
}

async function createProducts(admin) {
	const store = await prisma.store.create({
		data: {
			name: "Admin Store",
			ownerId: admin.id,
		},
	});

	const storeFront = await prisma.storeFront.create({
		data: {
			name: "Main Storefront",
			storeId: store.id,
			description: "This is the main storefront",
		},
	});

	const productCategory = await prisma.productCategories.create({
		data: {
			name: "Default Category",
			description: "Default category for all products",
		},
	});

	const fakeProduct = (): Prisma.ProductCreateManyInput => ({
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		price: parseFloat(faker.commerce.price()),
		stock: faker.datatype.number(100),
		storeId: store.id,
		authorId: admin.id,
		storeFrontId: storeFront.id,
	});

	for (let i = 0; i < 20; i++) {
		await prisma.product.create({
			data: {
				...fakeProduct(),
				productCategories: {
					connect: { id: productCategory.id },
				}
			}
		});
	}
}

async function main() {
	const users = await createUser();
	await createPermissionRole(users);
	await createProducts(users.admin);
}

main().catch((e) => {
	throw e;
});
