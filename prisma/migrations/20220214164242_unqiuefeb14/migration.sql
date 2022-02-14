/*
  Warnings:

  - A unique constraint covering the columns `[tmdbId]` on the table `Cast` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tmdbId]` on the table `Crew` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tmdbId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tmdbId]` on the table `SeasonEpisode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tmdbId]` on the table `Series` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tmdbId]` on the table `SeriesSeason` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tmdbId` to the `Series` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "tmdbId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cast_tmdbId_key" ON "Cast"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "Crew_tmdbId_key" ON "Crew"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_tmdbId_key" ON "Movie"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "SeasonEpisode_tmdbId_key" ON "SeasonEpisode"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "Series_tmdbId_key" ON "Series"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "SeriesSeason_tmdbId_key" ON "SeriesSeason"("tmdbId");
