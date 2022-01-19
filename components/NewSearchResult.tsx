import React from "react";
import { tmdbImgBase, tmdbImgBaseSmall } from "../constants/constants";
import Link from "next/link";

export default function NewSearchResult(props: any) {
  let card: JSX.Element = <></>;
  let posterImg;
  if (props.media.poster_path) {
    posterImg = <img src={tmdbImgBaseSmall + props.media.poster_path} />;
  }

  if (props.media.media_type == "person") {
    return <></>;
  }
  if (props.media.media_type == "movie") {
    card = (
      <div className="flex flex-col ml-2 w-full">
        <span className="text-lg bold">
          <b>{props.media.title}</b> -{" "}
          {props.media.release_date?.toString().substring(0, 4)} -{" "}
          <span className="bg-blue-50 rounded p-1 text-sm">Movie</span>
        </span>
        <span className="text-sm mt-1 overflow-hidden">
          {props.media.overview}
        </span>
        <Link href={"/addmovie/" + props.media.id}>
          <button className="btn btn-blue mt-auto self-end">Add Movie</button>
        </Link>
      </div>
    );
  } else if (props.media.media_type == "tv") {
    card = (
      <div className="flex flex-col ml-2 w-full">
        <span className="text-lg bold">
          <b>{props.media.name}</b> -{" "}
          {props.media.first_air_date?.toString().substring(0, 4)} -{" "}
          <span className="bg-blue-50 rounded p-1 text-sm">Series</span>
        </span>
        <span className="text-sm mt-1">{props.media.overview}</span>
        <Link href={"/addseries/" + props.media.id}>
          <button className="btn btn-blue mt-auto self-end">Add Show</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex w-1/2 p-4 m-4 rounded-md bg-primary-light max-h-80">
      {posterImg}
      {card}
    </div>
  );
}
