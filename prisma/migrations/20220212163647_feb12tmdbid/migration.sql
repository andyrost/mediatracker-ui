/*
  Warnings:

  - Added the required column `tmdbId` to the `Cast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tmdbId` to the `Crew` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cast" ADD COLUMN     "tmdbId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Crew" ADD COLUMN     "tmdbId" INTEGER NOT NULL;
