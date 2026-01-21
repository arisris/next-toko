import { pgTable, serial, text, integer, boolean, timestamp, real, uniqueIndex, index, unique, foreignKey, type AnyPgColumn } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// ... (other tables)

// Fix recursive reference by defining type separately or breaking circular dependency
// Drizzle supports self-referencing, but TypeScript inference can get stuck.
// We can use a callback for references to delay execution, but the variable itself needs an explicit type if referenced inside.
// However, `pgTable` returns a PgTable object.

// For `productCategories` and `productComments` self-reference:
// Using `AnyPgColumn` or similar trick might be needed if TS complains.
// Actually, splitting the definition or using `alias` is cleaner for queries, but for schema definition:

// User
export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name'),
  password: text('password'),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  gender: text('gender'),
  brithDate: timestamp('brithDate', { mode: 'date' }),
  phone: text('phone'),
  phoneVerified: timestamp('phoneVerified', { mode: 'date' }),
  aboutMe: text('aboutMe'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
  roleId: integer('roleId').references(() => role.id),
  membershipId: integer('membershipId').references(() => membership.id),
}, (table) => {
  return {
    membershipIdx: index('user_membershipId_idx').on(table.membershipId),
    roleIdx: index('user_roleId_idx').on(table.roleId),
  }
});

// Accounts
export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: integer('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refreshToken: text('refresh_token'),
  refreshTokenExpiresIn: integer('refresh_token_expires_in'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  idToken: text('id_token'),
  sessionState: text('session_state'),
  oauthTokenSecret: text('oauth_token_secret'),
  oauthToken: text('oauth_token'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
}, (table) => {
  return {
    providerUnique: unique('accounts_provider_providerAccountId_unique').on(table.provider, table.providerAccountId),
    userIdIdx: index('accounts_userId_idx').on(table.userId),
  }
});

// Membership
export const membership = pgTable('membership', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  pricing: text('pricing'),
  isActive: boolean('isActive').default(false),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
});

// Role
export const role = pgTable('role', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  displayName: text('displayName'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
});

// Permission
export const permission = pgTable('permission', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  displayName: text('displayName').notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
});

// Relations for Role-Permission
export const rolePermission = pgTable('role_permission', {
  roleId: integer('roleId').notNull().references(() => role.id, { onDelete: 'cascade' }),
  permissionId: integer('permissionId').notNull().references(() => permission.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: unique().on(table.roleId, table.permissionId),
}));


// Store
export const store = pgTable('store', {
  id: serial('id').primaryKey(),
  ownerId: integer('ownerId').notNull().unique().references(() => user.id),
  name: text('name').notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
  description: text('description'),
});

// StoreTeam
export const storeTeam = pgTable('store_team', {
  id: serial('id').primaryKey(),
  storeId: integer('storeId').notNull().references(() => store.id),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
}, (table) => {
  return {
    storeIdx: index('store_team_storeId_idx').on(table.storeId),
  }
});

// StoreTeam Users
export const storeTeamUser = pgTable('store_team_user', {
    storeTeamId: integer('storeTeamId').notNull().references(() => storeTeam.id, { onDelete: 'cascade' }),
    userId: integer('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
}, (table) => ({
    pk: unique().on(table.storeTeamId, table.userId),
}));

// StoreFront
export const storeFront = pgTable('store_front', {
  id: serial('id').primaryKey(),
  storeId: integer('storeId').notNull().references(() => store.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  icon: text('icon'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
}, (table) => {
  return {
    storeIdx: index('store_front_storeId_idx').on(table.storeId),
  }
});


// Product
export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  storeId: integer('storeId').notNull().references(() => store.id),
  authorId: integer('authorId').notNull().references(() => user.id),
  storeFrontId: integer('storeFrontId').notNull().references(() => storeFront.id),
  name: text('name').notNull(),
  description: text('description'),
  price: real('price').notNull(),
  stock: integer('stock').notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
}, (table) => {
  return {
    authorIdx: index('product_authorId_idx').on(table.authorId),
    storeFrontIdx: index('product_storeFrontId_idx').on(table.storeFrontId),
    storeAuthorIdx: index('product_storeId_authorId_idx').on(table.storeId, table.authorId),
  }
});

// Product Categories
export const productCategories = pgTable('product_categories', {
  id: serial('id').primaryKey(),
  productCategoriesId: integer('productCategoriesId').references((): AnyPgColumn => productCategories.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  icon: text('icon'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
}, (table) => {
  return {
    parentIdx: index('product_categories_productCategoriesId_idx').on(table.productCategoriesId),
  }
});

// Product <-> Product Categories
export const productToCategory = pgTable('product_to_category', {
    productId: integer('productId').notNull().references(() => product.id, { onDelete: 'cascade' }),
    categoryId: integer('categoryId').notNull().references(() => productCategories.id, { onDelete: 'cascade' }),
}, (table) => ({
    pk: unique().on(table.productId, table.categoryId),
}));


// Product Tags
export const productTags = pgTable('product_tags', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  icon: text('icon'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
});

// Product <-> Product Tags
export const productToTag = pgTable('product_to_tag', {
    productId: integer('productId').notNull().references(() => product.id, { onDelete: 'cascade' }),
    tagId: integer('tagId').notNull().references(() => productTags.id, { onDelete: 'cascade' }),
}, (table) => ({
    pk: unique().on(table.productId, table.tagId),
}));

// Product Comments
export const productComments = pgTable('product_comments', {
  id: serial('id').primaryKey(),
  productId: integer('productId').notNull().references(() => product.id),
  authorId: integer('authorId').notNull().references(() => user.id),
  productCommentsId: integer('productCommentsId').references((): AnyPgColumn => productComments.id),
  type: text('type'),
  status: text('status'),
  rating: integer('rating').default(0),
  description: text('description'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
}, (table) => {
  return {
    authorIdx: index('product_comments_authorId_idx').on(table.authorId),
    parentIdx: index('product_comments_productCommentsId_idx').on(table.productCommentsId),
    productIdx: index('product_comments_productId_idx').on(table.productId),
  }
});

// Data Country
export const dataCountry = pgTable('data_contry', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  lng: text('lng'),
  lat: text('lat'),
  icon: text('icon'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
});

// Data Province
export const dataProvince = pgTable('data_province', {
  id: serial('id').primaryKey(),
  countryId: integer('countryId').references(() => dataCountry.id),
  name: text('name').notNull(),
  lng: text('lng'),
  lat: text('lat'),
  icon: text('icon'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
}, (table) => {
  return {
    countryIdx: index('data_province_countryId_idx').on(table.countryId),
  }
});

// Data City
export const dataCity = pgTable('data_city', {
  id: serial('id').primaryKey(),
  provinceId: integer('provinceId').references(() => dataProvince.id),
  name: text('name').notNull(),
  lng: text('lng'),
  lat: text('lat'),
  icon: text('icon'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
}, (table) => {
  return {
    provinceIdx: index('data_city_provinceId_idx').on(table.provinceId),
  }
});

// Data District
export const dataDistrict = pgTable('data_district', {
  id: serial('id').primaryKey(),
  cityId: integer('cityId').references(() => dataCity.id),
  name: text('name').notNull(),
  lng: text('lng'),
  lat: text('lat'),
  icon: text('icon'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
}, (table) => {
  return {
    cityIdx: index('data_district_cityId_idx').on(table.cityId),
  }
});

// Data Village
export const dataVillage = pgTable('data_village', {
  id: serial('id').primaryKey(),
  districtId: integer('districtId').references(() => dataDistrict.id),
  name: text('name').notNull(),
  lng: text('lng'),
  lat: text('lat'),
  icon: text('icon'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
}, (table) => {
  return {
    districtIdx: index('data_village_districtId_idx').on(table.districtId),
  }
});

// Store Location
export const storeLocation = pgTable('store_location', {
  id: serial('id').primaryKey(),
  storeId: integer('storeId').notNull().references(() => store.id),
  countryId: integer('countryId').references(() => dataCountry.id),
  provinceId: integer('provinceId').references(() => dataProvince.id),
  cityId: integer('cityId').references(() => dataCity.id),
  districtId: integer('districtId').references(() => dataDistrict.id),
  villageId: integer('villageId').references(() => dataVillage.id),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
}, (table) => {
  return {
    storeIdx: index('store_location_storeId_idx').on(table.storeId),
    countryIdx: index('store_location_countryId_idx').on(table.countryId),
    provinceIdx: index('store_location_provinceId_idx').on(table.provinceId),
    cityIdx: index('store_location_cityId_idx').on(table.cityId),
    districtIdx: index('store_location_districtId_idx').on(table.districtId),
    villageIdx: index('store_location_villageId_idx').on(table.villageId),
  }
});

// User Location
export const userLocation = pgTable('user_location', {
  id: serial('id').primaryKey(),
  userId: integer('userId').notNull().references(() => user.id),
  countryId: integer('countryId').references(() => dataCountry.id),
  provinceId: integer('provinceId').references(() => dataProvince.id),
  cityId: integer('cityId').references(() => dataCity.id),
  districtId: integer('districtId').references(() => dataDistrict.id),
  villageId: integer('villageId').references(() => dataVillage.id),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).$onUpdate(() => new Date()),
}, (table) => {
  return {
    userIdIdx: index('user_location_userId_idx').on(table.userId),
    countryIdx: index('user_location_countryId_idx').on(table.countryId),
    provinceIdx: index('user_location_provinceId_idx').on(table.provinceId),
    cityIdx: index('user_location_cityId_idx').on(table.cityId),
    districtIdx: index('user_location_districtId_idx').on(table.districtId),
    villageIdx: index('user_location_villageId_idx').on(table.villageId),
  }
});

// Data Bank
export const dataBank = pgTable('data_bank', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  code: text('code').notNull(),
  address: text('address'),
  phone: text('phone'),
  fax: text('fax'),
  website: text('website'),
});

// Cart
export const cart = pgTable('cart', {
  id: serial('id').primaryKey(),
  userId: integer('userId').notNull().unique().references(() => user.id),
}, (table) => {
  return {
    userIdIdx: index('cart_userId_idx').on(table.userId),
  }
});

// Cart Item
export const cartItem = pgTable('cart_item', {
  id: serial('id').primaryKey(),
  cartId: integer('cartId').notNull().references(() => cart.id),
  productId: integer('productId').notNull().references(() => product.id),
  quantity: integer('quantity').notNull(),
}, (table) => {
  return {
    uniqueItem: unique('cart_item_cartId_productId_unique').on(table.cartId, table.productId),
  }
});
