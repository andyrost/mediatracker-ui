import prisma from "../../lib/prisma";

export default async function handler(req: any, res: any) {
  const { castArr, crewArr, movieId } = req.body;
  let castCounter = 0;
  let crewCounter = 0;

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
      const castInMovieMatch = await prisma.castInMovie.findFirst({
        where: {
          castId: castId,
          movieId: movieId,
        },
      });

      if (!castInMovieMatch) {
        const character = person.character;
        const newCastInMovie = await prisma.castInMovie.create({
          data: {
            movieId,
            castId,
            character,
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
      const castInMovieMatch = await prisma.crewInMovie.findFirst({
        where: {
          crewId: crewId,
          movieId: movieId,
        },
      });

      if (!castInMovieMatch) {
        const job = person.job;
        const newCrewInMovie = await prisma.crewInMovie.create({
          data: {
            movieId,
            crewId,
            job,
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
}
