import React from "react";
import { tmdbImgBaseSmallest } from "../constants/constants";
import Link from "next/link";

export default function MediaCard(props: any) {
  return (
    <Link href="">
      <a
        className="rounded-md m-1 bg-center bg-cover"
        style={{
          backgroundImage: `url('${tmdbImgBaseSmallest + props.poster}')`,
        }}
      >
        <p
          className="h-72 w-48 rounded opacity-0 bg-opacity-0 
        hover:bg-opacity-30 hover:opacity-100 bg-primary-light flex 
        justify-center transition-all"
        ></p>
      </a>
    </Link>
  );
}
