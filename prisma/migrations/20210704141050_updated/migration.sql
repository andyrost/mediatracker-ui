/*
  Warnings:

  - You are about to drop the column `profile_pic` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profile_pic",
ADD COLUMN     "image" TEXT,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "verification_requests" ALTER COLUMN "updated_at" DROP DEFAULT;
