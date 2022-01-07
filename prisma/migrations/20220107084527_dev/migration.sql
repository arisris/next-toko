-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` BOOLEAN NULL DEFAULT false,
    `phoneNumber` VARCHAR(191) NULL,
    `photo` TEXT NULL DEFAULT 'https://0.gravatar.com/avatar/me?s=96',
    `role` ENUM('USER', 'SELLER', 'ADMIN') NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_username_key`(`username`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialAccounts` (
    `id` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `token` TEXT NOT NULL,
    `refreshToken` TEXT NOT NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Posts` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('BLOGPOST', 'PRODUCT') NOT NULL DEFAULT 'BLOGPOST',
    `name` VARCHAR(191) NOT NULL,
    `image` TEXT NULL,
    `body` LONGTEXT NULL,
    `status` ENUM('PUBLISH', 'DRAFT', 'PRIVATE', 'DELETED') NULL DEFAULT 'DRAFT',
    `authorId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('BLOGPOST', 'PRODUCT') NOT NULL DEFAULT 'BLOGPOST',
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tags` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('BLOGPOST', 'PRODUCT') NOT NULL DEFAULT 'BLOGPOST',
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductVariants` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('BLOGPOST', 'PRODUCT') NOT NULL DEFAULT 'PRODUCT',
    `status` ENUM('OUTOFSTOCK', 'DELETED', 'AVAILABLE', 'DRAFT') NOT NULL DEFAULT 'DRAFT',
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `price` INTEGER NULL DEFAULT 0,
    `stock` INTEGER NULL DEFAULT 0,
    `image` TEXT NULL,
    `productId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PostsToTags` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PostsToTags_AB_unique`(`A`, `B`),
    INDEX `_PostsToTags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoriesToPosts` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CategoriesToPosts_AB_unique`(`A`, `B`),
    INDEX `_CategoriesToPosts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SocialAccounts` ADD CONSTRAINT `SocialAccounts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductVariants` ADD CONSTRAINT `ProductVariants_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostsToTags` ADD FOREIGN KEY (`A`) REFERENCES `Posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostsToTags` ADD FOREIGN KEY (`B`) REFERENCES `Tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriesToPosts` ADD FOREIGN KEY (`A`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriesToPosts` ADD FOREIGN KEY (`B`) REFERENCES `Posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
