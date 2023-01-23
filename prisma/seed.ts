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
	const users = await prisma.user.createMany({
		data: fakeArray(5).map(() => fakeUser()),
	});
	return {
		admin,
		users,
	};
}

async function createPermissionRole(users) {
	await prisma.role.createMany({
		data: [
			{
				name: Role.ADMIN,
				displayName: "Admin",
			},
			{
				name: Role.USER,
				displayName: "User",
			},
		],
	});
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

async function main() {
	const users = await createUser();
	await createPermissionRole(users);
}

main().catch((e) => {
	throw e;
});
