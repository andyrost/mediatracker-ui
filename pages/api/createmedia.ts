import prisma from "../../lib/prisma";

export default async function handler(req: any, res: any) {
  const {
    tmdbId,
    title,
    tagline,
    description,
    year,
    release_date,
    type,
    poster,
    backdrop,
    genres,
    addedById,
    verified,
  } = req.body;

  try {
    await prisma.media.create({
      data: {
        tmdbId,
        title,
        tagline,
        description,
        year,
        release_date,
        type,
        poster,
        backdrop,
        genres,
        addedById,
        verified,
      },
    });

    res.status(200).json({ message: "created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
