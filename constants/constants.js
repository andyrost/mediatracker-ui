//App API
export const createMovie = "http://localhost:3000/api/createmovie";
export const createCast = "http://localhost:3000/api/createcast";

//Search API
export const tmdbSearchBase =
  "https://api.themoviedb.org/3/search/multi?api_key=" +
  process.env.NEXT_PUBLIC_TMDB_KEY +
  "&query=";

//Image API
export const tmdbImgBase = "https://image.tmdb.org/t/p/original/";
export const tmdbImgBaseSmall = "https://image.tmdb.org/t/p/w400/";
export const tmdbImgBaseSmallest = "https://image.tmdb.org/t/p/w200/";
export const tmdbBackdropBase = "https://image.tmdb.org/t/p/w1280/";

//Detail API
export const tmdbKeyTail = "?api_key=" + process.env.NEXT_PUBLIC_TMDB_KEY;
export const tmdbMovieBase = "https://api.themoviedb.org/3/movie/";
export const tmdbSeriesBase = "https://api.themoviedb.org/3/tv/";
