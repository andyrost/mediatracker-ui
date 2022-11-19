/*
  Warnings:

  - The primary key for the `WatchedMovie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `WatchedMovie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WatchedMovie" DROP CONSTRAINT "WatchedMovie_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "WatchedMovie_pkey" PRIMARY KEY ("userId", "movieId");
