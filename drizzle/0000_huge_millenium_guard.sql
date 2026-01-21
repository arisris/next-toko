CREATE TABLE "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"refresh_token_expires_in" integer,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	"oauth_token_secret" text,
	"oauth_token" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	CONSTRAINT "accounts_provider_providerAccountId_unique" UNIQUE("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "cart" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "cart_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "cart_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"cartId" integer NOT NULL,
	"productId" integer NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "cart_item_cartId_productId_unique" UNIQUE("cartId","productId")
);
--> statement-breakpoint
CREATE TABLE "data_bank" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"code" text NOT NULL,
	"address" text,
	"phone" text,
	"fax" text,
	"website" text
);
--> statement-breakpoint
CREATE TABLE "data_city" (
	"id" serial PRIMARY KEY NOT NULL,
	"provinceId" integer,
	"name" text NOT NULL,
	"lng" text,
	"lat" text,
	"icon" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "data_contry" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"lng" text,
	"lat" text,
	"icon" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "data_district" (
	"id" serial PRIMARY KEY NOT NULL,
	"cityId" integer,
	"name" text NOT NULL,
	"lng" text,
	"lat" text,
	"icon" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "data_province" (
	"id" serial PRIMARY KEY NOT NULL,
	"countryId" integer,
	"name" text NOT NULL,
	"lng" text,
	"lat" text,
	"icon" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "data_village" (
	"id" serial PRIMARY KEY NOT NULL,
	"districtId" integer,
	"name" text NOT NULL,
	"lng" text,
	"lat" text,
	"icon" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "membership" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"pricing" text,
	"isActive" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"displayName" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"storeId" integer NOT NULL,
	"authorId" integer NOT NULL,
	"storeFrontId" integer NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" real NOT NULL,
	"stock" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "product_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"productCategoriesId" integer,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text,
	"icon" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "product_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"productId" integer NOT NULL,
	"authorId" integer NOT NULL,
	"productCommentsId" integer,
	"type" text,
	"status" text,
	"rating" integer DEFAULT 0,
	"description" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "product_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text,
	"icon" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "product_to_category" (
	"productId" integer NOT NULL,
	"categoryId" integer NOT NULL,
	CONSTRAINT "product_to_category_productId_categoryId_unique" UNIQUE("productId","categoryId")
);
--> statement-breakpoint
CREATE TABLE "product_to_tag" (
	"productId" integer NOT NULL,
	"tagId" integer NOT NULL,
	CONSTRAINT "product_to_tag_productId_tagId_unique" UNIQUE("productId","tagId")
);
--> statement-breakpoint
CREATE TABLE "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"displayName" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	CONSTRAINT "role_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "role_permission" (
	"roleId" integer NOT NULL,
	"permissionId" integer NOT NULL,
	CONSTRAINT "role_permission_roleId_permissionId_unique" UNIQUE("roleId","permissionId")
);
--> statement-breakpoint
CREATE TABLE "store" (
	"id" serial PRIMARY KEY NOT NULL,
	"ownerId" integer NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"description" text,
	CONSTRAINT "store_ownerId_unique" UNIQUE("ownerId")
);
--> statement-breakpoint
CREATE TABLE "store_front" (
	"id" serial PRIMARY KEY NOT NULL,
	"storeId" integer NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image" text,
	"icon" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "store_location" (
	"id" serial PRIMARY KEY NOT NULL,
	"storeId" integer NOT NULL,
	"countryId" integer,
	"provinceId" integer,
	"cityId" integer,
	"districtId" integer,
	"villageId" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "store_team" (
	"id" serial PRIMARY KEY NOT NULL,
	"storeId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "store_team_user" (
	"storeTeamId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "store_team_user_storeTeamId_userId_unique" UNIQUE("storeTeamId","userId")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"password" text,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"gender" text,
	"brithDate" timestamp,
	"phone" text,
	"phoneVerified" timestamp,
	"aboutMe" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	"roleId" integer,
	"membershipId" integer,
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_location" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"countryId" integer,
	"provinceId" integer,
	"cityId" integer,
	"districtId" integer,
	"villageId" integer,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cartId_cart_id_fk" FOREIGN KEY ("cartId") REFERENCES "public"."cart"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_city" ADD CONSTRAINT "data_city_provinceId_data_province_id_fk" FOREIGN KEY ("provinceId") REFERENCES "public"."data_province"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_district" ADD CONSTRAINT "data_district_cityId_data_city_id_fk" FOREIGN KEY ("cityId") REFERENCES "public"."data_city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_province" ADD CONSTRAINT "data_province_countryId_data_contry_id_fk" FOREIGN KEY ("countryId") REFERENCES "public"."data_contry"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_village" ADD CONSTRAINT "data_village_districtId_data_district_id_fk" FOREIGN KEY ("districtId") REFERENCES "public"."data_district"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_storeId_store_id_fk" FOREIGN KEY ("storeId") REFERENCES "public"."store"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_storeFrontId_store_front_id_fk" FOREIGN KEY ("storeFrontId") REFERENCES "public"."store_front"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_productCategoriesId_product_categories_id_fk" FOREIGN KEY ("productCategoriesId") REFERENCES "public"."product_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_comments" ADD CONSTRAINT "product_comments_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_comments" ADD CONSTRAINT "product_comments_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_comments" ADD CONSTRAINT "product_comments_productCommentsId_product_comments_id_fk" FOREIGN KEY ("productCommentsId") REFERENCES "public"."product_comments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_to_category" ADD CONSTRAINT "product_to_category_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_to_category" ADD CONSTRAINT "product_to_category_categoryId_product_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_to_tag" ADD CONSTRAINT "product_to_tag_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_to_tag" ADD CONSTRAINT "product_to_tag_tagId_product_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."product_tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_roleId_role_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."role"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permissionId_permission_id_fk" FOREIGN KEY ("permissionId") REFERENCES "public"."permission"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store" ADD CONSTRAINT "store_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_front" ADD CONSTRAINT "store_front_storeId_store_id_fk" FOREIGN KEY ("storeId") REFERENCES "public"."store"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_location" ADD CONSTRAINT "store_location_storeId_store_id_fk" FOREIGN KEY ("storeId") REFERENCES "public"."store"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_location" ADD CONSTRAINT "store_location_countryId_data_contry_id_fk" FOREIGN KEY ("countryId") REFERENCES "public"."data_contry"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_location" ADD CONSTRAINT "store_location_provinceId_data_province_id_fk" FOREIGN KEY ("provinceId") REFERENCES "public"."data_province"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_location" ADD CONSTRAINT "store_location_cityId_data_city_id_fk" FOREIGN KEY ("cityId") REFERENCES "public"."data_city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_location" ADD CONSTRAINT "store_location_districtId_data_district_id_fk" FOREIGN KEY ("districtId") REFERENCES "public"."data_district"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_location" ADD CONSTRAINT "store_location_villageId_data_village_id_fk" FOREIGN KEY ("villageId") REFERENCES "public"."data_village"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_team" ADD CONSTRAINT "store_team_storeId_store_id_fk" FOREIGN KEY ("storeId") REFERENCES "public"."store"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_team_user" ADD CONSTRAINT "store_team_user_storeTeamId_store_team_id_fk" FOREIGN KEY ("storeTeamId") REFERENCES "public"."store_team"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "store_team_user" ADD CONSTRAINT "store_team_user_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_role_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_membershipId_membership_id_fk" FOREIGN KEY ("membershipId") REFERENCES "public"."membership"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_countryId_data_contry_id_fk" FOREIGN KEY ("countryId") REFERENCES "public"."data_contry"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_provinceId_data_province_id_fk" FOREIGN KEY ("provinceId") REFERENCES "public"."data_province"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_cityId_data_city_id_fk" FOREIGN KEY ("cityId") REFERENCES "public"."data_city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_districtId_data_district_id_fk" FOREIGN KEY ("districtId") REFERENCES "public"."data_district"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_villageId_data_village_id_fk" FOREIGN KEY ("villageId") REFERENCES "public"."data_village"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "accounts_userId_idx" ON "accounts" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "cart_userId_idx" ON "cart" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "data_city_provinceId_idx" ON "data_city" USING btree ("provinceId");--> statement-breakpoint
CREATE INDEX "data_district_cityId_idx" ON "data_district" USING btree ("cityId");--> statement-breakpoint
CREATE INDEX "data_province_countryId_idx" ON "data_province" USING btree ("countryId");--> statement-breakpoint
CREATE INDEX "data_village_districtId_idx" ON "data_village" USING btree ("districtId");--> statement-breakpoint
CREATE INDEX "product_authorId_idx" ON "product" USING btree ("authorId");--> statement-breakpoint
CREATE INDEX "product_storeFrontId_idx" ON "product" USING btree ("storeFrontId");--> statement-breakpoint
CREATE INDEX "product_storeId_authorId_idx" ON "product" USING btree ("storeId","authorId");--> statement-breakpoint
CREATE INDEX "product_categories_productCategoriesId_idx" ON "product_categories" USING btree ("productCategoriesId");--> statement-breakpoint
CREATE INDEX "product_comments_authorId_idx" ON "product_comments" USING btree ("authorId");--> statement-breakpoint
CREATE INDEX "product_comments_productCommentsId_idx" ON "product_comments" USING btree ("productCommentsId");--> statement-breakpoint
CREATE INDEX "product_comments_productId_idx" ON "product_comments" USING btree ("productId");--> statement-breakpoint
CREATE INDEX "store_front_storeId_idx" ON "store_front" USING btree ("storeId");--> statement-breakpoint
CREATE INDEX "store_location_storeId_idx" ON "store_location" USING btree ("storeId");--> statement-breakpoint
CREATE INDEX "store_location_countryId_idx" ON "store_location" USING btree ("countryId");--> statement-breakpoint
CREATE INDEX "store_location_provinceId_idx" ON "store_location" USING btree ("provinceId");--> statement-breakpoint
CREATE INDEX "store_location_cityId_idx" ON "store_location" USING btree ("cityId");--> statement-breakpoint
CREATE INDEX "store_location_districtId_idx" ON "store_location" USING btree ("districtId");--> statement-breakpoint
CREATE INDEX "store_location_villageId_idx" ON "store_location" USING btree ("villageId");--> statement-breakpoint
CREATE INDEX "store_team_storeId_idx" ON "store_team" USING btree ("storeId");--> statement-breakpoint
CREATE INDEX "user_membershipId_idx" ON "user" USING btree ("membershipId");--> statement-breakpoint
CREATE INDEX "user_roleId_idx" ON "user" USING btree ("roleId");--> statement-breakpoint
CREATE INDEX "user_location_userId_idx" ON "user_location" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "user_location_countryId_idx" ON "user_location" USING btree ("countryId");--> statement-breakpoint
CREATE INDEX "user_location_provinceId_idx" ON "user_location" USING btree ("provinceId");--> statement-breakpoint
CREATE INDEX "user_location_cityId_idx" ON "user_location" USING btree ("cityId");--> statement-breakpoint
CREATE INDEX "user_location_districtId_idx" ON "user_location" USING btree ("districtId");--> statement-breakpoint
CREATE INDEX "user_location_villageId_idx" ON "user_location" USING btree ("villageId");