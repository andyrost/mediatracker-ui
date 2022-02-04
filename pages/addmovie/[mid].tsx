import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  tmdbBackdropBase,
  tmdbImgBase,
  tmdbImgBaseSmall,
  tmdbKeyTail,
  tmdbMovieBase,
} from "../../constants/constants";

export const getServerSideProps = async (context: any) => {
  console.log(context.query);
  const { mid } = context.query;
  let url = tmdbMovieBase + mid + tmdbKeyTail;

  const res = await fetch(url, {
    method: "GET",
  });
  const movie: any = await res.json();

  return { props: { movie } };
};

export default function AddMovie(props: any) {
  console.log(props.movie);
  let genres = [];
  let key = 0;
  for (let genre of props.movie?.genres) {
    genres.push(<span key={key}>{genre.name} - </span>);
    key += 1;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="w-3/5"
        src={tmdbImgBase + props?.movie?.backdrop_path}
      ></img>
      <div
        className="flex flex-col m-4 p-4 rounded-b-md w-3/5
        -mt-60 bg-gradient-to-t  from-primary-dark via-primary-dark text-white"
      >
        <span className="text-6xl mt-10 mb-2">
          <b>{props?.movie.title}</b>
        </span>
        <span className="text-xl mb-8">{props?.movie.tagline}</span>
        <div className="flex">
          <img src={tmdbImgBaseSmall + props?.movie?.poster_path}></img>
          <div className="flex flex-col bg-primary-light text-black rounded-md p-4 m-4 w-full">
            <span className="text-xl">
              <i>{genres}</i>
            </span>
            <span className="">{props?.movie.overview}</span>
            <span>{props?.movie.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
