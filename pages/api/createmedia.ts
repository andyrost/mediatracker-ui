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
    const match = await prisma.media.findFirst({
      where: {
        tmdbId: tmdbId,
      },
    });
    if (match) {
      res
        .status(200)
        .json({ message: "Record already exists.", duplicate: true });
    } else {
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
      res.status(201).json({ message: "Record created sucessfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
