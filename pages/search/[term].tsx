import React from "react";
import { getSession } from "next-auth/client";
import prisma from "../../lib/prisma";
import MediaCard from "../../components/MediaCard";
import Link from "next/link";

export const getServerSideProps = async (context: any) => {
  let { term } = context.query;
  term = term.replace(/\s+/g, " ").trim();
  let decoded = term.split(" ").join(" & ");

  const mresults = await prisma.movie.findMany({
    where: {
      title: {
        search: decoded,
      },
    },
  });
  const sresults = await prisma.series.findMany({
    where: {
      title: {
        search: decoded,
      },
    },
  });
  const maresults = await prisma.movie.findMany({
    where: {
      cast: {
        some: {
          cast: {
            is: {
              name: {
                search: decoded,
              },
            },
          },
        },
      },
    },
  });
  const saresults = await prisma.series.findMany({
    where: {
      cast: {
        some: {
          cast: {
            is: {
              name: {
                search: decoded,
              },
            },
          },
        },
      },
    },
  });
  const aresults = await prisma.cast.findMany({
    where: {
      name: {
        search: decoded,
      },
    },
  });
  return { props: { mresults, sresults, maresults, aresults } };
};

export default function SearchResults(props: any) {
  let [state, setState] = React.useState({
    mresults: [],
    sresults: [],
    maresults: [],
    aresults: [],
  });

  React.useEffect(() => {
    setState({
      ...state,
      mresults: props.mresults,
      sresults: props.sresults,
    });
  }, []);

  return (
    <>
      <h1 className="text-white font-bold text-2xl m-4">Search Results</h1>
      <h2 className="ml-4 text-white font-semibold text-xl">Movies</h2>
      <div className="m-2 flex overflow-hidden">
        {state.mresults.length > 0 ? (
          state.mresults.map((item: any) => {
            let card = (
              <MediaCard
                title={item.title}
                mediaType="movie"
                poster={item.poster}
                id={item.id}
                key={item.id}
              ></MediaCard>
            );

            return card;
          })
        ) : (
          <h3 className="ml-2 text-white">No Movies Found</h3>
        )}
      </div>
      <h2 className="ml-4 text-white font-semibold text-xl">Series</h2>
      <div className="m-2 flex overflow-hidden">
        {state.sresults.length > 0 ? (
          state.sresults.map((item: any) => {
            let card = (
              <MediaCard
                title={item.title}
                mediaType="series"
                poster={item.poster}
                id={item.id}
                key={item.id}
              ></MediaCard>
            );

            return card;
          })
        ) : (
          <h3 className="ml-2 text-white">No Series Found</h3>
        )}
      </div>
      <div className="m-2">
        <h2 className="ml-2 text-white font-semibold text-xl">
          Can't find what you're looking for? Add it to our collection!
        </h2>
        <br></br>
        <Link href="/addmedia">
          <a className="btn btn-blue m-2">Add Media to MediaTracker</a>
        </Link>
      </div>
    </>
  );
}
