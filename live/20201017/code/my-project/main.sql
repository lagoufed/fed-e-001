/*
 Navicat Premium Data Transfer

 Source Server         : local_blog
 Source Server Type    : SQLite
 Source Server Version : 3030001
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3030001
 File Encoding         : 65001

 Date: 24/08/2020 23:20:01
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for contacts
-- ----------------------------
DROP TABLE IF EXISTS "contacts";
CREATE TABLE `contacts` (`id` integer not null primary key autoincrement, `name` varchar(255) null, `email` varchar(255) null, `phone` varchar(255) null, `message` text null, `created_by` integer null, `updated_by` integer null, `created_at` datetime null default CURRENT_TIMESTAMP, `updated_at` datetime null default CURRENT_TIMESTAMP);

-- ----------------------------
-- Table structure for core_store
-- ----------------------------
DROP TABLE IF EXISTS "core_store";
CREATE TABLE `core_store` (`id` integer not null primary key autoincrement, `key` varchar(255) null, `value` text null, `type` varchar(255) null, `environment` varchar(255) null, `tag` varchar(255) null);

-- ----------------------------
-- Table structure for generals
-- ----------------------------
DROP TABLE IF EXISTS "generals";
CREATE TABLE `generals` (`id` integer not null primary key autoincrement, `title` varchar(255) null, `subtitle` varchar(255) null, `created_by` integer null, `updated_by` integer null, `created_at` datetime null default CURRENT_TIMESTAMP, `updated_at` datetime null default CURRENT_TIMESTAMP);

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS "posts";
CREATE TABLE `posts` (`id` integer not null primary key autoincrement, `title` varchar(255) not null, `content` text not null, `is_publish` boolean not null, `created_by` integer null, `updated_by` integer null, `created_at` datetime null default CURRENT_TIMESTAMP, `updated_at` datetime null default CURRENT_TIMESTAMP);

-- ----------------------------
-- Table structure for posts_tags__tags_posts
-- ----------------------------
DROP TABLE IF EXISTS "posts_tags__tags_posts";
CREATE TABLE `posts_tags__tags_posts` (`id` integer not null primary key autoincrement, `tag_id` integer null, `post_id` integer null);

-- ----------------------------
-- Table structure for sqlite_sequence
-- ----------------------------
DROP TABLE IF EXISTS "sqlite_sequence";
CREATE TABLE sqlite_sequence(name,seq);

-- ----------------------------
-- Table structure for strapi_administrator
-- ----------------------------
DROP TABLE IF EXISTS "strapi_administrator";
CREATE TABLE `strapi_administrator` (`id` integer not null primary key autoincrement, `firstname` varchar(255) null, `lastname` varchar(255) null, `username` varchar(255) null, `email` varchar(255) not null, `password` varchar(255) null, `resetPasswordToken` varchar(255) null, `registrationToken` varchar(255) null, `isActive` boolean null, `blocked` boolean null);

-- ----------------------------
-- Table structure for strapi_permission
-- ----------------------------
DROP TABLE IF EXISTS "strapi_permission";
CREATE TABLE `strapi_permission` (`id` integer not null primary key autoincrement, `action` varchar(255) not null, `subject` varchar(255) null, `fields` text null, `conditions` text null, `role` integer null, `created_at` datetime null default CURRENT_TIMESTAMP, `updated_at` datetime null default CURRENT_TIMESTAMP);

-- ----------------------------
-- Table structure for strapi_role
-- ----------------------------
DROP TABLE IF EXISTS "strapi_role";
CREATE TABLE `strapi_role` (`id` integer not null primary key autoincrement, `name` varchar(255) not null, `code` varchar(255) not null, `description` varchar(255) null, `created_at` datetime null default CURRENT_TIMESTAMP, `updated_at` datetime null default CURRENT_TIMESTAMP);

-- ----------------------------
-- Table structure for strapi_users_roles
-- ----------------------------
DROP TABLE IF EXISTS "strapi_users_roles";
CREATE TABLE `strapi_users_roles` (`id` integer not null primary key autoincrement, `user_id` integer null, `role_id` integer null);

-- ----------------------------
-- Table structure for strapi_webhooks
-- ----------------------------
DROP TABLE IF EXISTS "strapi_webhooks";
CREATE TABLE `strapi_webhooks` (`id` integer not null primary key autoincrement, `name` varchar(255) null, `url` text null, `headers` text null, `events` text null, `enabled` boolean null);

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS "tags";
CREATE TABLE `tags` (`id` integer not null primary key autoincrement, `title` varchar(255) null, `created_by` integer null, `updated_by` integer null, `created_at` datetime null default CURRENT_TIMESTAMP, `updated_at` datetime null default CURRENT_TIMESTAMP);

-- ----------------------------
-- Table structure for upload_file
-- ----------------------------
DROP TABLE IF EXISTS "upload_file";
CREATE TABLE `upload_file` (`id` integer not null primary key autoincrement, `name` varchar(255) not null, `alternativeText` varchar(255) null, `caption` varchar(255) null, `width` integer null, `height` integer null, `formats` text null, `hash` varchar(255) not null, `ext` varchar(255) null, `mime` varchar(255) not null, `size` float not null, `url` varchar(255) not null, `previewUrl` varchar(255) null, `provider` varchar(255) not null, `provider_metadata` text null, `created_by` integer null, `updated_by` integer null, `created_at` datetime null default CURRENT_TIMESTAMP, `updated_at` datetime null default CURRENT_TIMESTAMP);

-- ----------------------------
-- Table structure for upload_file_morph
-- ----------------------------
DROP TABLE IF EXISTS "upload_file_morph";
CREATE TABLE `upload_file_morph` (`id` integer not null primary key autoincrement, `upload_file_id` integer null, `related_id` integer null, `related_type` text null, `field` text null, `order` integer null);

-- ----------------------------
-- Table structure for users-permissions_permission
-- ----------------------------
DROP TABLE IF EXISTS "users-permissions_permission";
CREATE TABLE `users-permissions_permission` (`id` integer not null primary key autoincrement, `type` varchar(255) not null, `controller` varchar(255) not null, `action` varchar(255) not null, `enabled` boolean not null, `policy` varchar(255) null, `role` integer null, `created_by` integer null, `updated_by` integer null);

-- ----------------------------
-- Table structure for users-permissions_role
-- ----------------------------
DROP TABLE IF EXISTS "users-permissions_role";
CREATE TABLE `users-permissions_role` (`id` integer not null primary key autoincrement, `name` varchar(255) not null, `description` varchar(255) null, `type` varchar(255) null, `created_by` integer null, `updated_by` integer null);

-- ----------------------------
-- Table structure for users-permissions_user
-- ----------------------------
DROP TABLE IF EXISTS "users-permissions_user";
CREATE TABLE `users-permissions_user` (`id` integer not null primary key autoincrement, `username` varchar(255) not null, `email` varchar(255) not null, `provider` varchar(255) null, `password` varchar(255) null, `resetPasswordToken` varchar(255) null, `confirmed` boolean null, `blocked` boolean null, `role` integer null, `created_by` integer null, `updated_by` integer null, `created_at` datetime null default CURRENT_TIMESTAMP, `updated_at` datetime null default CURRENT_TIMESTAMP);

-- ----------------------------
-- Auto increment value for contacts
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 3 WHERE name = 'contacts';

-- ----------------------------
-- Auto increment value for core_store
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 33 WHERE name = 'core_store';

-- ----------------------------
-- Auto increment value for generals
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 1 WHERE name = 'generals';

-- ----------------------------
-- Auto increment value for posts
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 10 WHERE name = 'posts';

-- ----------------------------
-- Auto increment value for posts_tags__tags_posts
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 11 WHERE name = 'posts_tags__tags_posts';

-- ----------------------------
-- Auto increment value for strapi_administrator
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 1 WHERE name = 'strapi_administrator';

-- ----------------------------
-- Indexes structure for table strapi_administrator
-- ----------------------------
CREATE UNIQUE INDEX "main"."strapi_administrator_email_unique"
ON "strapi_administrator" (
  "email" ASC
);

-- ----------------------------
-- Auto increment value for strapi_permission
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 76 WHERE name = 'strapi_permission';

-- ----------------------------
-- Auto increment value for strapi_role
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 3 WHERE name = 'strapi_role';

-- ----------------------------
-- Indexes structure for table strapi_role
-- ----------------------------
CREATE UNIQUE INDEX "main"."strapi_role_code_unique"
ON "strapi_role" (
  "code" ASC
);
CREATE UNIQUE INDEX "main"."strapi_role_name_unique"
ON "strapi_role" (
  "name" ASC
);

-- ----------------------------
-- Auto increment value for strapi_users_roles
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 1 WHERE name = 'strapi_users_roles';

-- ----------------------------
-- Auto increment value for tags
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 4 WHERE name = 'tags';

-- ----------------------------
-- Auto increment value for upload_file
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 3 WHERE name = 'upload_file';

-- ----------------------------
-- Auto increment value for upload_file_morph
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 15 WHERE name = 'upload_file_morph';

-- ----------------------------
-- Auto increment value for users-permissions_permission
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 208 WHERE name = 'users-permissions_permission';

-- ----------------------------
-- Auto increment value for users-permissions_role
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 2 WHERE name = 'users-permissions_role';

-- ----------------------------
-- Indexes structure for table users-permissions_role
-- ----------------------------
CREATE UNIQUE INDEX "main"."users-permissions_role_type_unique"
ON "users-permissions_role" (
  "type" ASC
);

-- ----------------------------
-- Auto increment value for users-permissions_user
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 2 WHERE name = 'users-permissions_user';

-- ----------------------------
-- Indexes structure for table users-permissions_user
-- ----------------------------
CREATE UNIQUE INDEX "main"."users-permissions_user_username_unique"
ON "users-permissions_user" (
  "username" ASC
);

PRAGMA foreign_keys = true;
