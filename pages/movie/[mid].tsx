import React from "react";
import { getSession } from "next-auth/client";
import prisma from "../../lib/prisma";
import {
  createMovie,
  createCast,
  tmdbImg,
  tmdbImgBase,
  tmdbImgBaseSmall,
  tmdbKeyTail,
  tmdbMovieBase,
} from "../../constants/constants";
import Image from "next/image";

export const getServerSideProps = async (context: any) => {
  const { mid } = context.query;

  const movie = await prisma.movie.findUnique({
    where: {
      id: Number(mid),
    },
  });

  const cast = await prisma.cast.findMany({
    where: {
      involvedMovie: {
        some: {
          movieId: Number(mid),
        },
      },
    },
    select: {
      name: true,
      involvedMovie: {
        select: {
          importance: true,
          character: true,
        },
      },
    },
  });

  let newCast: any[] = [];

  for (let member of cast) {
    newCast.push({
      name: member.name,
      importance: member.involvedMovie[0].importance,
      character: member.involvedMovie[0].character,
    });
  }
  return { props: { movie: movie, cast: newCast } };
};

const posterLoader = ({ src, width, quality }: any) => {
  let stepwidth = 342;
  return `${tmdbImg}w${stepwidth}${src}`;
};

export default function Movie(props: any) {
  console.log(props);
  const [state, setState] = React.useState({
    watchedMovieExpanded: false,
  });
  return (
    <div className="flex flex-col justify-center items-center">
      <img className="w-4/5" src={tmdbImgBase + props?.movie?.backdrop}></img>
      <div
        className="flex flex-col m-4 p-4 w-4/5
        -mt-60 bg-gradient-to-t  from-primary-dark text-white"
      >
        <span className="text-6xl mt-10 mb-2">
          <b>{props?.movie.title}</b>
        </span>
        <span className="text-xl mb-20 h-8">{props?.movie.tagline}</span>
      </div>
      <div className="flex -mt-20 w-4/5 p-4">
        <div>
          <Image
            loader={posterLoader}
            src={props?.movie?.poster}
            width={400}
            height={600}
            layout="fixed"
          ></Image>
        </div>
        <div className="flex flex-col space-y-4 bg-primary-light text-black rounded-md p-4 m-4 w-full opacity-80">
          <span className="text-2xl">
            <span>
              {props?.movie?.releaseDate?.getFullYear()} {" | "}
            </span>
            <i>
              {props.movie.genres.map((genre: any, i: number) => {
                if (i + 1 === props.movie.genres.length) {
                  return genre + " | ";
                } else {
                  return genre + ", ";
                }
              })}
            </i>
            <span>
              <button className="btn btn-blue text-xl">
                Add to your Watched
              </button>
            </span>
          </span>
          <span className="text-xl">{props?.movie.description}</span>
          <span className="text-xl">Starring: Cast</span>
          <span className="text-xl">Crew</span>
        </div>
      </div>
    </div>
  );
}
