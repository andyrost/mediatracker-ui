import prisma from "../../lib/prisma";

export default async function handler(req: any, res: any) {
  const { castArr, crewArr, mediaId, type } = req.body;
  let castCounter = 0;
  let crewCounter = 0;
  console.log(mediaId);

  try {
    for (let person of castArr) {
      try {
        let castId;
        const castMatch = await prisma.cast.findFirst({
          where: {
            tmdbId: person.id,
          },
        });
        if (!castMatch) {
          const tmdbId = person.id;
          console.log(tmdbId);
          const name = person.name;
          castCounter += 1;
          const newCast = await prisma.cast.create({
            data: {
              name,
              tmdbId,
            },
          });
          castId = newCast.id;
        } else {
          castId = castMatch.id;
        }
        if (type == "movie") {
          const castInMovieMatch = await prisma.castInMovie.findFirst({
            where: {
              castId: castId,
              movieId: mediaId,
            },
          });

          if (!castInMovieMatch) {
            const character = person.character;
            const newCastInMovie = await prisma.castInMovie.create({
              data: {
                movieId: mediaId,
                castId,
                character,
              },
            });
          }
        } else if (type == "series") {
          const newCastInSeries = await prisma.castInSeries.upsert({
            where: {
              castId_seriesId: {
                castId: castId,
                seriesId: mediaId,
              },
            },
            update: {
              character: person.character,
            },
            create: {
              castId: castId,
              seriesId: mediaId,
              character: person.character,
            },
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    }
    for (let person of crewArr) {
      try {
        let crewId;
        const crewMatch = await prisma.crew.findFirst({
          where: {
            tmdbId: person.id,
          },
        });
        if (!crewMatch) {
          const tmdbId = person.id;
          console.log(tmdbId);
          const name = person.name;
          crewCounter += 1;
          const newCrew = await prisma.crew.create({
            data: {
              name,
              tmdbId,
            },
          });
          crewId = newCrew.id;
        } else {
          crewId = crewMatch.id;
        }

        if (type == "movie") {
          const crewInMovieMatch = await prisma.crewInMovie.findFirst({
            where: {
              crewId: crewId,
              movieId: mediaId,
            },
          });

          if (!crewInMovieMatch) {
            const job = person.job;
            const newCrewInMovie = await prisma.crewInMovie.create({
              data: {
                movieId: mediaId,
                crewId,
                job,
              },
            });
          }
        } else if (type == "series") {
          const newCrewInSeries = await prisma.crewInSeries.upsert({
            where: {
              crewId_seriesId: {
                crewId: crewId,
                seriesId: mediaId,
              },
            },
            update: {
              job: person.job,
            },
            create: {
              crewId: crewId,
              seriesId: mediaId,
              job: person.job,
            },
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    }
    res
      .status(201)
      .json({ message: "success", newCast: castCounter, newCrew: crewCounter });
  } catch (error) {
    res.status(500).json(error);
  }
}
