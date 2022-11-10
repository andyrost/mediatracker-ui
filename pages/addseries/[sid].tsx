import React from "react";
import { getSession } from "next-auth/client";
import prisma from "../../lib/prisma";
import {
  tmdbImg,
  tmdbImgBase,
  tmdbKeyTail,
  tmdbSeriesBase,
  createSeries,
  createCast,
} from "../../constants/constants";
import Image from "next/image";

export const getServerSideProps = async (context: any) => {
  console.log(context.query);
  const { sid } = context.query;
  let url = tmdbSeriesBase + sid + tmdbKeyTail;
  let casturl = tmdbSeriesBase + sid + "/credits" + tmdbKeyTail;

  const res = await fetch(url, {
    method: "GET",
  });
  const series: any = await res.json();

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

  return { props: { series, cast, user } };
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
    if (
      (key == maxKey - 1 || key == castArr.length - 1) &&
      castArr.length > 0
    ) {
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
    crew.push(<span key={dkey}>Directors: {director}</span>);
  } else {
    crew.push(<span key={dkey}>Director: {director}</span>);
  }

  return crew;
}
const posterLoader = ({ src, width, quality }: any) => {
  let stepwidth = 342;
  return `${tmdbImg}w${stepwidth}${src}`;
};

async function createSeriesAPI(series: any, user: any, genreStrings: any) {
  const res = await fetch(createSeries, {
    body: JSON.stringify({
      series: series,
      genres: genreStrings,
      userId: user.userId,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

async function createCastCrewAPI(cast: any, crew: any, seriesId: number) {
  const res = await fetch(createCast, {
    body: JSON.stringify({
      castArr: cast,
      crewArr: crew,
      mediaId: seriesId,
      type: "series",
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export default function AddSeries(props: any) {
  const [state, setState] = React.useState({
    createSeriesState: <></>,
    duplicateSeries: <></>,
  });
  console.log(props);
  let genres = genreList(props.series?.genres);
  let genreStrings = genreStringList(props.series?.genres);
  let cast = castList(props.cast?.cast);
  let crew = crewList(props.cast?.crew);

  async function handleSubmit(e: any) {
    setState({
      duplicateSeries: <></>,
      createSeriesState: <span className="bg-white p-1 rounded">Loading</span>,
    });
    e.preventDefault();

    let seriesId;

    await createSeriesAPI(props.series, props.user, genreStrings).then(
      (res) => {
        seriesId = res.seriesId;
        if (res.isDuplicateSeries) {
          setState({
            createSeriesState: <></>,
            duplicateSeries: (
              <span className="bg-yellow-200 p-1 rounded">
                This series is already in the database!
              </span>
            ),
          });
        } else {
          setState({
            ...state,
            createSeriesState: (
              <span className="bg-green-200 p-1 rounded">
                Series Added Successfully
              </span>
            ),
          });
        }
      }
    );

    if (seriesId) {
      await createCastCrewAPI(
        props.cast?.cast,
        props.cast?.crew,
        seriesId
      ).then((res) => {
        console.log(res);
      });
    }
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="w-4/5"
        src={tmdbImgBase + props?.series?.backdrop_path}
      ></img>
      <div
        className="flex flex-col m-4 p-4 w-4/5
        -mt-60 bg-gradient-to-t  from-primary-dark text-white"
      >
        <span className="text-6xl mt-10 mb-2">
          <b>{props?.series?.name}</b>
        </span>
        <span className="text-xl mb-20 h-8">{props?.series?.tagline}</span>
      </div>
      <div className="flex -mt-20 w-4/5 p-4">
        <div>
          <Image
            loader={posterLoader}
            src={props?.series?.poster_path}
            width={400}
            height={600}
          ></Image>
        </div>
        <div className="flex flex-col space-y-4 bg-primary-light text-black rounded-md p-4 m-4 w-full opacity-80">
          <span className="text-2xl">
            <span>
              {props?.series.first_air_date.toString().substring(0, 4)} to{" "}
              {props?.series.last_air_date.toString().substring(0, 4)} {" | "}
            </span>
            <i>{genres}</i>
          </span>
          <span className="text-xl">{props?.series?.overview}</span>
          <span className="text-xl">Starring: {cast}</span>
          <span className="text-xl"></span>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center mt-auto self-center mb-4"
          >
            <button type="submit" className="btn btn-blue">
              Add Series to MediaTracker
            </button>
            <div className="mt-3">{state.createSeriesState}</div>
            <div className="mt-3">{state.duplicateSeries}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
