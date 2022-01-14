import React from "react";

export default function addmedia() {
  const [state, setState] = React.useState({
    search: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();

    let url =
      "https://api.themoviedb.org/3/search/multi?api_key=" +
      process.env.NEXT_PUBLIC_TMDB_KEY +
      "&query=" +
      state.search;

    const res = await fetch(url, {
      method: "GET",
    }).then((res) => res.json());

    console.log(res);
  }

  function handleChange(e: any) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex justify-center">
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
      <div className="flex flex-col"></div>
    </div>
  );
}
