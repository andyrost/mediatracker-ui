/*
  Warnings:

  - Added the required column `updatedAt` to the `Cast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CastInMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CastInSeries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Crew` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CrewInMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CrewInSeries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SeasonEpisode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SeriesSeason` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WatchedMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WatchedSeasonEpisode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WatchedSeries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WatchedSeriesSeason` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cast" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CastInMovie" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CastInSeries" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Crew" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CrewInMovie" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CrewInSeries" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SeasonEpisode" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SeriesSeason" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WatchedMovie" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "watchedAt" TIMESTAMP(3),
ALTER COLUMN "platform" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WatchedSeasonEpisode" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "watchedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "WatchedSeries" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "watchedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "WatchedSeriesSeason" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "watchedAt" TIMESTAMP(3);
