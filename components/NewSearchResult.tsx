import React from "react";

export default function NewSearchResult(props: any) {
  return (
    <div className="flex flex-col w-1/2 p-4 m-4 rounded-md bg-primary-light">
      <span className="text-lg bold">
        <b>{props.media.title}</b> -{" "}
        {props.media.release_date?.toString().substring(0, 4)}
      </span>
      <span className="text-sm">{props.media.overview}</span>
    </div>
  );
}
