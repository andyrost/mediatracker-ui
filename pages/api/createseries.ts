import prisma from "../../lib/prisma";
import { tmdbSeriesBase, tmdbKeyTail } from "../../constants/constants";

export default async function handler(req: any, res: any) {
  const { series, genres, userId } = req.body;
  let isDuplicateSeries = false;
  let duplicateSeasons = 0;
  let duplicateEpisodes = 0;
  let seriesId = -1;
  let newseries;

  try {
    newseries = await prisma.series.upsert({
      where: {
        tmdbId: series.id,
      },
      update: {
        title: series.name,
        tagline: series.tagline,
        overview: series.overview,
        type: series.type,
        genres: genres,
        firstAirDate: new Date(series.first_air_date),
        lastAirDate: new Date(series.last_air_date),
        poster: series.poster_path,
        backdrop: series.backdrop_path,
        seasonCount: series.season_number,
        status: series.status,
      },
      create: {
        addedById: userId,
        tmdbId: series.id,
        title: series.name,
        tagline: series.tagline,
        overview: series.overview,
        type: series.type,
        genres: genres,
        firstAirDate: new Date(series.first_air_date),
        lastAirDate: new Date(series.last_air_date),
        poster: series.poster_path,
        backdrop: series.backdrop_path,
        seasonCount: series.season_number,
        status: series.status,
      },
    });
    seriesId = newseries.id;
    if ((await newseries).updatedAt != (await newseries).createdAt) {
      isDuplicateSeries = true;
    }

    if (seriesId != -1) {
      for (let season of series.seasons) {
        let seasonId = -1;
        try {
          const newseason = await prisma.seriesSeason.upsert({
            where: {
              tmdbId: season.id,
            },
            update: {
              airDate: new Date(season.air_date),
              episodeCount: season.episode_count,
              name: season.name,
              overview: season.overview,
              poster: season.poster_path,
              seasonNumber: season.season_number,
            },
            create: {
              seriesId: seriesId,
              tmdbId: season.id,
              airDate: new Date(season.air_date),
              episodeCount: season.episode_count,
              name: season.name,
              overview: season.overview,
              poster: season.poster_path,
              seasonNumber: season.season_number,
            },
          });
          seasonId = newseason.id;
          if (newseason.createdAt != newseason.updatedAt) {
            duplicateSeasons += 1;
          }
        } catch (error) {
          //Fill
        }
        const seasonurl =
          tmdbSeriesBase +
          series.id +
          "/season/" +
          season.season_number +
          tmdbKeyTail;
        const seasonres = await fetch(seasonurl, {
          method: "GET",
        });
        const fullseason = await seasonres.json();
        console.log(seasonurl);
        if (seasonId != -1) {
          for (let episode of fullseason.episodes) {
            try {
              const newepisode = await prisma.seasonEpisode.upsert({
                where: {
                  tmdbId: episode.id,
                },
                update: {
                  name: episode.name,
                  overview: episode.overview,
                  poster: episode.still_path,
                  airDate: new Date(episode.air_date),
                  episodeNumber: episode.episode_number,
                },
                create: {
                  seasonId: seasonId,
                  tmdbId: episode.id,
                  name: episode.name,
                  overview: episode.overview,
                  poster: episode.still_path,
                  airDate: new Date(episode.air_date),
                  episodeNumber: episode.episode_number,
                },
              });
              if (newepisode.createdAt != newepisode.updatedAt) {
                duplicateEpisodes += 1;
              }
            } catch (error) {
              //Fill
            }
          }
        }
      }
    }
    res.status(201).json({
      message: "Success",
      isDuplicateSeries: isDuplicateSeries,
      duplicateSeasons: duplicateSeasons,
      duplicateEpisodes: duplicateEpisodes,
      seriesId: seriesId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error with Series upsert: " + error,
      isDuplicateSeries: isDuplicateSeries,
      duplicateSeasons: duplicateSeasons,
      duplicateEpisodes: duplicateEpisodes,
    });
  }
}
