import React from "react";
import { tmdbImgBase, tmdbImgBaseSmall } from "../constants/constants";

export default function NewSearchResult(props: any) {
  let card: JSX.Element = <></>;

  if (props.media.media_type == "movie") {
    let posterImg;
    if (props.media.poster_path) {
      posterImg = (
        <img
          className="shrink"
          src={tmdbImgBaseSmall + props.media.poster_path}
        />
      );
    }
    card = (
      <div className="flex rounded-md bg-primary-light w-1/2  p-4 m-4 ">
        {posterImg}
        <div className="flex flex-col m-2 w-full justify-start">
          <span className="text-lg bold">
            <b>{props.media.title}</b> -{" "}
            {props.media.release_date?.toString().substring(0, 4)} -{" "}
            <span className="bg-blue-50 rounded p-1 text-sm">Movie</span>
          </span>
          <span className="text-sm">{props.media.overview}</span>
          <button className="btn btn-blue mt-auto self-end">Add Movie</button>
        </div>
      </div>
    );
  } else if (props.media.media_type == "tv") {
    let posterImg;
    if (props.media.poster_path) {
      posterImg = <img src={tmdbImgBaseSmall + props.media.poster_path} />;
    }
    card = (
      <div className="flex min-w-1/2 p-4 m-4 rounded-md bg-primary-light">
        {posterImg}
        <div className="flex flex-col justify-center m-2">
          <span className="text-lg bold">
            <b>{props.media.name}</b> -{" "}
            {props.media.first_air_date?.toString().substring(0, 4)} -{" "}
            <span className="bg-blue-50 rounded p-1 text-sm">Series</span>
          </span>
          <span className="text-sm">{props.media.overview}</span>
          <button className="btn btn-blue">Add Show</button>
        </div>
      </div>
    );
  }
  return card;
}
