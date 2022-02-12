/*
  Warnings:

  - You are about to drop the `CastInMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CrewInMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WatchedMedia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CastInMedia" DROP CONSTRAINT "CastInMedia_castId_fkey";

-- DropForeignKey
ALTER TABLE "CastInMedia" DROP CONSTRAINT "CastInMedia_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "CrewInMedia" DROP CONSTRAINT "CrewInMedia_crewId_fkey";

-- DropForeignKey
ALTER TABLE "CrewInMedia" DROP CONSTRAINT "CrewInMedia_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_addedById_fkey";

-- DropForeignKey
ALTER TABLE "WatchedMedia" DROP CONSTRAINT "WatchedMedia_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "WatchedMedia" DROP CONSTRAINT "WatchedMedia_userId_fkey";

-- AlterTable
ALTER TABLE "Cast" ALTER COLUMN "nationality" DROP NOT NULL;

-- DropTable
DROP TABLE "CastInMedia";

-- DropTable
DROP TABLE "CrewInMedia";

-- DropTable
DROP TABLE "Media";

-- DropTable
DROP TABLE "WatchedMedia";

-- CreateTable
CREATE TABLE "WatchedMovie" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "timesWatched" INTEGER,
    "percentage_watched" DOUBLE PRECISION,
    "platform" TEXT NOT NULL,

    CONSTRAINT "WatchedMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchedSeries" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION,
    "timesWatched" INTEGER,
    "platform" TEXT,

    CONSTRAINT "WatchedSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchedSeriesSeason" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "seriesSeasonId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION,
    "timesWatched" INTEGER,

    CONSTRAINT "WatchedSeriesSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchedSeasonEpisode" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "seasonEpisodeId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION,
    "timesWatched" INTEGER,

    CONSTRAINT "WatchedSeasonEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "addedById" TEXT,
    "tmdbId" INTEGER NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "tagline" TEXT,
    "description" TEXT,
    "releaseDate" TIMESTAMP(3),
    "poster" TEXT,
    "backdrop" TEXT,
    "genres" TEXT[],
    "budget" DOUBLE PRECISION,
    "revenue" DOUBLE PRECISION,
    "runtime" DOUBLE PRECISION,
    "status" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "addedById" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "tagline" TEXT,
    "overview" TEXT,
    "type" TEXT,
    "genres" TEXT[],
    "firstAirDate" TIMESTAMP(3),
    "lastAirDate" TIMESTAMP(3),
    "poster" TEXT,
    "backdrop" TEXT,
    "seasonCount" INTEGER,
    "episodeCount" INTEGER,
    "status" TEXT,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeriesSeason" (
    "id" SERIAL NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "tmdbId" INTEGER,
    "name" TEXT NOT NULL,
    "overview" TEXT,
    "poster" TEXT,
    "airDate" TIMESTAMP(3),
    "episodeCount" INTEGER,
    "seasonNumber" INTEGER,

    CONSTRAINT "SeriesSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonEpisode" (
    "id" SERIAL NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "tmdbId" INTEGER,
    "name" TEXT NOT NULL,
    "overview" TEXT,
    "poster" TEXT,
    "episodeNumber" INTEGER,

    CONSTRAINT "SeasonEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CastInMovie" (
    "castId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "character" TEXT NOT NULL,

    CONSTRAINT "CastInMovie_pkey" PRIMARY KEY ("castId","movieId")
);

-- CreateTable
CREATE TABLE "CastInSeries" (
    "castId" INTEGER NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "character" TEXT NOT NULL,

    CONSTRAINT "CastInSeries_pkey" PRIMARY KEY ("castId","seriesId")
);

-- CreateTable
CREATE TABLE "CrewInMovie" (
    "crewId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "job" TEXT NOT NULL,

    CONSTRAINT "CrewInMovie_pkey" PRIMARY KEY ("crewId","movieId")
);

-- CreateTable
CREATE TABLE "CrewInSeries" (
    "crewId" INTEGER NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "job" TEXT NOT NULL,

    CONSTRAINT "CrewInSeries_pkey" PRIMARY KEY ("crewId","seriesId")
);

-- AddForeignKey
ALTER TABLE "WatchedMovie" ADD CONSTRAINT "WatchedMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedMovie" ADD CONSTRAINT "WatchedMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedSeries" ADD CONSTRAINT "WatchedSeries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedSeries" ADD CONSTRAINT "WatchedSeries_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedSeriesSeason" ADD CONSTRAINT "WatchedSeriesSeason_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedSeriesSeason" ADD CONSTRAINT "WatchedSeriesSeason_seriesSeasonId_fkey" FOREIGN KEY ("seriesSeasonId") REFERENCES "SeriesSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedSeasonEpisode" ADD CONSTRAINT "WatchedSeasonEpisode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedSeasonEpisode" ADD CONSTRAINT "WatchedSeasonEpisode_seasonEpisodeId_fkey" FOREIGN KEY ("seasonEpisodeId") REFERENCES "SeasonEpisode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeriesSeason" ADD CONSTRAINT "SeriesSeason_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonEpisode" ADD CONSTRAINT "SeasonEpisode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "SeriesSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CastInMovie" ADD CONSTRAINT "CastInMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CastInMovie" ADD CONSTRAINT "CastInMovie_castId_fkey" FOREIGN KEY ("castId") REFERENCES "Cast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CastInSeries" ADD CONSTRAINT "CastInSeries_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CastInSeries" ADD CONSTRAINT "CastInSeries_castId_fkey" FOREIGN KEY ("castId") REFERENCES "Cast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewInMovie" ADD CONSTRAINT "CrewInMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewInMovie" ADD CONSTRAINT "CrewInMovie_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewInSeries" ADD CONSTRAINT "CrewInSeries_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrewInSeries" ADD CONSTRAINT "CrewInSeries_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "Crew"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
