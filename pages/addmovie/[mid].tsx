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
  let maxKey = 7;
  for (let person of castArr) {
    if (key == maxKey - 1 || key == castArr.length - 1) {
      cast.push(
        <div key={key}>
          and <b>{person.name}</b> as {person.character}
        </div>
      );
    } else {
      cast.push(
        <div key={key}>
          <b>{person.name}</b> as {person.character}
        </div>
      );
    }
    key += 1;
    if (key >= maxKey) {
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

const posterLoader = ({ src, width, quality }: any) => {
  let stepwidth = 342;
  return `${tmdbImg}w${stepwidth}${src}`;
};

async function createMovieAPI(movie: any, user: any, genreStrings: any) {
  const res = await fetch(createMovie, {
    body: JSON.stringify({
      addedById: user.userId,
      tmdbId: movie.id,
      verified: false,
      title: movie.title,
      tagline: movie.tagline,
      description: movie.overview,
      releaseDate: new Date(movie.release_date),
      poster: movie.poster_path,
      backdrop: movie.backdrop_path,
      genres: genreStrings,
      budget: movie.budget,
      revenue: movie.revenue,
      runtime: movie.runtime,
      status: movie.status,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

async function createCastCrewAPI(cast: any, crew: any, movieId: number) {
  const res = await fetch(createCast, {
    body: JSON.stringify({
      castArr: cast,
      crewArr: crew,
      mediaId: movieId,
      type: "movie",
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export default function AddMovie(props: any) {
  console.log(props);
  const [state, setState] = React.useState({
    createMovieState: <></>,
    duplicateMovie: <></>,
  });

  let genres = genreList(props.movie?.genres);
  let genreStrings = genreStringList(props.movie?.genres);
  let cast = castList(props.cast?.cast);
  let crew = crewList(props.cast?.crew);

  async function handleSubmit(e: any) {
    setState({
      duplicateMovie: <></>,
      createMovieState: <span className="bg-white p-1 rounded">Loading</span>,
    });
    e.preventDefault();

    let movieId;

    await createMovieAPI(props.movie, props.user, genreStrings).then((res) => {
      movieId = res.movieId;
      if (res.duplicate) {
        setState({
          createMovieState: <></>,
          duplicateMovie: (
            <span className="bg-yellow-200 p-1 rounded">
              This movie is already in the database!
            </span>
          ),
        });
      } else {
        setState({
          ...state,
          createMovieState: (
            <span className="bg-green-200 p-1 rounded">
              Movie Added Successfully
            </span>
          ),
        });
      }
    });

    if (movieId) {
      await createCastCrewAPI(props.cast?.cast, props.cast?.crew, movieId).then(
        (res) => {
          console.log(res);
        }
      );
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="w-4/5"
        src={tmdbImgBase + props?.movie?.backdrop_path}
      ></img>
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
            src={props?.movie?.poster_path}
            width={400}
            height={600}
            layout="fixed"
          ></Image>
        </div>
        <div className="flex flex-col space-y-4 bg-primary-light text-black rounded-md p-4 m-4 w-full opacity-80">
          <span className="text-2xl">
            <span>
              {props?.movie.release_date.toString().substring(0, 4)} {" | "}
            </span>
            <i>{genres}</i>
          </span>
          <span className="text-xl">{props?.movie.overview}</span>
          <span className="text-xl">Starring: {cast}</span>
          <span className="text-xl">{crew}</span>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center mt-auto self-center mb-4"
          >
            <button type="submit" className="btn btn-blue">
              Add Movie to MediaTracker
            </button>
            <div className="mt-3">{state.createMovieState}</div>
            <div className="mt-3">{state.duplicateMovie}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
