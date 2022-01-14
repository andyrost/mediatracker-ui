import React from "react";
import NewSearchResult from "../components/NewSearchResult";

export default function addmedia() {
  const [state, setState] = React.useState({
    search: "",
  });

  const [results, setResults] = React.useState<any>({
    results: [<div key={100}></div>],
  });

  async function handleSubmit(e: any) {
    e.preventDefault();

    let newResults: JSX.Element[] = [];

    let url =
      "https://api.themoviedb.org/3/search/multi?api_key=" +
      process.env.NEXT_PUBLIC_TMDB_KEY +
      "&query=" +
      state.search;

    const res = await fetch(url, {
      method: "GET",
    }).then((res) => res.json());

    let i = 0;
    console.log(res);

    for (let media of res.results) {
      newResults.push(
        <NewSearchResult key={i} media={media}></NewSearchResult>
      );
      i += 1;
      if (i >= 5) {
        break;
      }
    }
    setResults({ results: newResults });
  }

  function handleChange(e: any) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 m-4 bg-primary-light p-4 rounded-md w-1/2"
      >
        <span className="text-xl"> Search for Media here</span>
        <input
          name="search"
          placeholder="Enter Movie / TV Show..."
          onChange={handleChange}
          value={state.search}
          className="rounded-sm p-4 text-lg"
          required
        />
        <button className="btn btn-blue" type="submit">
          Search
        </button>
      </form>
      <div className="flex flex-col items-center">{results.results}</div>
    </div>
  );
}
