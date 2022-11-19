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
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid";

export const getServerSideProps = async (context: any) => {
  const { mid } = context.query;

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
          movieId: true,
          importance: true,
          character: true,
        },
      },
    },
  });

  let newCast: any[] = [];

  for (let member of cast) {
    let movieMatch = member.involvedMovie.filter(
      (movie) => movie.movieId == Number(mid)
    );
    newCast.push({
      name: member.name,
      importance: movieMatch[0].importance,
      character: movieMatch[0].character,
    });
  }

  const crew = await prisma.crew.findMany({
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
          movieId: true,
          importance: true,
          job: true,
        },
      },
    },
  });

  let newCrew: any[] = [];

  for (let member of crew) {
    let movieMatch = member.involvedMovie.filter(
      (movie) => movie.movieId == Number(mid)
    );
    newCrew.push({
      name: member.name,
      importance: movieMatch[0].importance,
      job: movieMatch[0].job,
    });
  }

  let watch;

  if (user) {
    watch = await prisma.watchedMovie.findUnique({
      where: {
        userId_movieId: {
          userId: user?.userId,
          movieId: Number(mid),
        },
      },
    });
  }

  const platforms = await prisma.platform.findMany({});

  return {
    props: {
      movie: movie,
      cast: newCast,
      crew: newCrew,
      user: user,
      watch: watch,
      platforms: platforms,
    },
  };
};

const posterLoader = ({ src, width, quality }: any) => {
  let stepwidth = 342;
  return `${tmdbImg}w${stepwidth}${src}`;
};

export default function Movie(props: any) {
  console.log(props);
  const [state, setState] = React.useState({
    watchedMovieExpanded: false,
    watchedMovieArrow: <></>,
    timesWatched: "",
    rating: "",
    ratingStatus: "",
    ratingColor: "",
    platform: "",
  });

  React.useEffect(() => {
    let ratingStatus = "Movie not watched or rated";
    let ratingColor = "bg-primary-light3";
    if (props.watch) {
      ratingStatus = "Rating: " + props.watch.rating;
      ratingColor = "bg-green-500";
    }
    setState({
      ...state,
      watchedMovieArrow: <ArrowDownIcon className="h-5 w-5"></ArrowDownIcon>,
      ratingStatus: ratingStatus,
      ratingColor: ratingColor,
    });
  }, []);

  function handleExpand() {
    if (state.watchedMovieExpanded) {
      setState({
        ...state,
        watchedMovieArrow: <ArrowDownIcon className="h-5 w-5"></ArrowDownIcon>,
        watchedMovieExpanded: false,
      });
    } else {
      setState({
        ...state,
        watchedMovieArrow: <ArrowUpIcon className="h-5 w-5"></ArrowUpIcon>,
        watchedMovieExpanded: true,
      });
    }
  }

  function handleWatchedChange(e: any) {
    let num = e.target.value;
    if (num) {
      num = Math.round(e.target.value);
    }
    if (num < 0) {
      num = 0;
    }
    setState({ ...state, [e.target.name]: num });
  }

  function handleRatingChange(e: any) {
    let num = e.target.value;
    let color = "bg-green-500";
    if (!num) {
      color = "bg-primary-light3";
    } else if (num < 0) {
      num = 0;
      color = "bg-red-500";
    } else if (num > 10) {
      num = 10;
      color = "bg-green-500";
    } else if (num < 5) {
      color = "bg-red-500";
    } else if (num < 8) {
      color = "bg-yellow-500";
    }
    setState({ ...state, [e.target.name]: num, ratingColor: color });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
  }

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
        <div className="flex flex-col space-y-4 bg-primary-light2 text-black rounded-sm p-4 m-4 w-full drop-shadow-2xl">
          <span
            className={`shadow-lg border-2 rounded-md p-2 ${state.ratingColor} transition-transform`}
          >
            <span className="flex text-2xl">
              <span>{state.ratingStatus}</span>
              <span className="mx-auto"></span>
              <span>
                <button
                  onClick={handleExpand}
                  className="btn btn-blue text-xl inline-flex"
                >
                  {state.watchedMovieArrow}
                </button>
              </span>
            </span>
            <div
              className={`${
                state.watchedMovieExpanded ? "h-32" : "h-0"
              } transition-all duration-250 overflow-hidden w-full text-xl`}
            >
              {state.watchedMovieExpanded && (
                <form className="h-full" onSubmit={handleSubmit}>
                  <div className="my-2 border-b-2 w-full"></div>
                  <table className="table-auto w-full">
                    <tbody>
                      <tr className="w-full">
                        <td>Your rating (out of 10): </td>
                        <td>
                          <input
                            className="w-20 rounded px-2 focus:outline-none align-middle"
                            type="number"
                            name="rating"
                            value={state.rating}
                            onChange={handleRatingChange}
                          ></input>
                        </td>
                      </tr>
                      <tr className="">
                        <td>Number of times watched: </td>
                        <td>
                          <input
                            className="w-20 rounded px-2 focus:outline-none align-middle"
                            type="number"
                            name="timesWatched"
                            value={state.timesWatched}
                            onChange={handleWatchedChange}
                          ></input>
                        </td>
                      </tr>
                      <tr className="">
                        <td>Platform last watched on: </td>
                        <td>
                          <select className="rounded focus:outline-none">
                            {props.platforms.map((element: any) => {
                              return (
                                <option key={element.id}>{element.name}</option>
                              );
                            })}
                          </select>
                        </td>
                        <td className="text-right">
                          <button
                            className="btn btn-blue text-lg h-11"
                            type="submit"
                          >
                            Submit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              )}
            </div>
          </span>
          <span className="text-2xl">
            <span>
              {props?.movie?.releaseDate?.getFullYear()} {"|"}
            </span>
            <span className="mx-2">
              <i>
                {props.movie.genres.map((genre: any, i: number) => {
                  if (i + 1 === props.movie.genres.length) {
                    return genre + "";
                  } else {
                    return genre + ", ";
                  }
                })}
              </i>
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
