import prisma from "../../lib/prisma";

export default async function handler(req: any, res: any) {
  const {
    tmdbId,
    title,
    tagline,
    description,
    releaseDate,
    poster,
    backdrop,
    genres,
    addedById,
    verified,
    budget,
    revenue,
    runtime,
    status,
  } = req.body;

  let newmovie;
  let movieId = -1;
  let duplicate = false;

  try {
    newmovie = await prisma.movie.upsert({
      where: {
        tmdbId: tmdbId,
      },
      update: {
        title: title,
        tagline: tagline,
        description: description,
        releaseDate: releaseDate,
        poster: poster,
        backdrop: backdrop,
        genres: genres,
        budget: budget,
        revenue: revenue,
        runtime: runtime,
        status: status,
      },
      create: {
        addedById: addedById,
        tmdbId: tmdbId,
        title: title,
        tagline: tagline,
        description: description,
        releaseDate: releaseDate,
        poster: poster,
        backdrop: backdrop,
        genres: genres,
        budget: budget,
        revenue: revenue,
        runtime: runtime,
        status: status,
      },
    });
    movieId = newmovie.id;
    if ((await newmovie).updatedAt != (await newmovie).createdAt) {
      duplicate = true;
    }
    res.status(201).json({
      message: "Record created sucessfully",
      movieId: movieId,
      duplicate: duplicate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, message: "Upsert failed" });
  }

  //try {
  //  const match = await prisma.movie.findFirst({
  //    where: {
  //      tmdbId: tmdbId,
  //    },
  //  });
  //  if (match) {
  //    res.status(200).json({
  //      message: "Record already exists.",
  //      duplicate: true,
  //      movieId: match.id,
  //    });
  //  } else {
  //    const movie = await prisma.movie.create({
  //      data: {
  //        addedById,
  //        tmdbId,
  //        verified,
  //        title,
  //        tagline,
  //        description,
  //        releaseDate,
  //        poster,
  //        backdrop,
  //        genres,
  //        budget,
  //        revenue,
  //        runtime,
  //        status,
  //      },
  //    });
  //    res
  //      .status(201)
  //      .json({ message: "Record created sucessfully", movieId: movie.id });
  //  }
  //} catch (error) {
  //  console.log(error);
  //  res.status(500).json({ error });
  //}
}
