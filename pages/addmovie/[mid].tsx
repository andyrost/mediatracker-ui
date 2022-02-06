import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import prisma from "../../lib/prisma";
import {
  createMedia,
  tmdbBackdropBase,
  tmdbImgBase,
  tmdbImgBaseSmall,
  tmdbKeyTail,
  tmdbMovieBase,
} from "../../constants/constants";
import Link from "next/link";

export const getServerSideProps = async (context: any) => {
  console.log(context.query);
  const { mid } = context.query;
  let url = tmdbMovieBase + mid + tmdbKeyTail;
  let casturl = tmdbMovieBase + mid + "/credits" + tmdbKeyTail;

  const res = await fetch(url, {
    method: "GET",
  });
  const movie: any = await res.json();

  const res2 = await fetch(casturl, {
    method: "GET",
  });
  const cast: any = await res2.json();

  const session = await getSession(context);

  if (session && session.accessToken) {
    var accessToken: string = session.accessToken || "unknown";
  } else {
    var accessToken: string = "unknown";
  }
  const user = await prisma.session.findUnique({
    where: {
      accessToken: accessToken,
    },
    select: {
      userId: true,
      user: true,
    },
  });

  return { props: { movie, cast, user } };
};

function genreList(genreArr: any) {
  if (!genreArr) {
    return <span>No Genre found</span>;
  }
  let genres = [];
  let key = 0;
  for (let genre of genreArr) {
    if (key == genreArr.length - 1) {
      genres.push(<span key={key}>{genre.name}</span>);
    } else {
      genres.push(<span key={key}>{genre.name} - </span>);
    }
    key += 1;
  }
  return genres;
}

function genreStringList(genreArr: any) {
  if (!genreArr) {
    return [""];
  }
  let genreStrings = [];
  for (let genre of genreArr) {
    genreStrings.push(genre.name);
  }
  return genreStrings;
}

function castList(castArr: any) {
  if (!castArr) {
    return <span>No Cast found</span>;
  }
  let cast = [];
  let key = 0;
  let maxKey = 5;
  for (let person of castArr) {
    if (key == maxKey - 1 || key == castArr.length - 1) {
      cast.push(
        <span key={key}>
          and <b>{person.name}</b> as {person.character}
        </span>
      );
    } else {
      cast.push(
        <span key={key}>
          <b>{person.name}</b> as {person.character} -{" "}
        </span>
      );
    }
    key += 1;
    if (key >= 5) {
      break;
    }
  }
  return cast;
}

function crewList(crewArr: any) {
  if (!crewArr) {
    return <span>No Crew Found</span>;
  }
  let crew = [];

  //Directors
  let director = [];
  let dkey = 0;
  const dmaxKey = 5;
  let directorArr = crewArr.filter((obj: any) => {
    return obj.job === "Director";
  });
  for (let person of directorArr) {
    if (dkey == dmaxKey - 1 || dkey == directorArr.length - 1) {
      director.push(<span key={dkey}>{person.name}</span>);
    } else {
      director.push(<span key={dkey}>{person.name}, </span>);
    }
    dkey += 1;
  }
  if (directorArr.length > 1) {
    crew.push(<span key={0}>Directors: {director}</span>);
  } else {
    crew.push(<span key={0}>Director: {director}</span>);
  }

  return crew;
}

async function createMovie(movie: any, user: any, genreStrings: any) {
  fetch(createMedia, {
    body: JSON.stringify({
      tmdbId: movie.id,
      title: movie.title,
      tagline: movie.tagline,
      description: movie.overview,
      year: Number(movie.release_date.toString().substring(0, 4)),
      release_date: new Date(movie.release_date),
      type: "movie",
      poster: movie.poster_path,
      backdrop: movie.backdrop_path,
      genres: genreStrings,
      addedById: user.userId,
      verified: false,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default function AddMovie(props: any) {
  console.log(props.user);
  let genres = genreList(props.movie?.genres);
  let genreStrings = genreStringList(props.movie?.genres);
  let cast = castList(props.cast?.cast);
  let crew = crewList(props.cast?.crew);

  function handleSubmit(e: any) {
    e.preventDefault();
    createMovie(props.movie, props.user, genreStrings);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="w-3/5"
        src={tmdbImgBase + props?.movie?.backdrop_path}
      ></img>
      <div
        className="flex flex-col m-4 p-4 w-3/5
        -mt-60 bg-gradient-to-t  from-primary-dark text-white"
      >
        <span className="text-6xl mt-10 mb-2">
          <b>{props?.movie.title}</b>
        </span>
        <span className="text-xl mb-20 h-8">{props?.movie.tagline}</span>
      </div>
      <div className="flex -mt-20 w-3/5 p-4">
        <img src={tmdbImgBaseSmall + props?.movie?.poster_path}></img>
        <div className="flex flex-col space-y-4 bg-primary-light text-black rounded-md p-4 m-4 w-full opacity-80">
          <span className="text-2xl">
            <i>{genres}</i>
          </span>
          <span className="text-xl">{props?.movie.overview}</span>
          <span className="text-xl">Starring: {cast}</span>
          <span className="text-xl">{crew}</span>

          <form onSubmit={handleSubmit}>
            <button type="submit" className="btn btn-blue mt-auto self-end">
              Add Movie to MediaTracker
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
