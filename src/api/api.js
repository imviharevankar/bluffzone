const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const FETCH_UPCOMING_MOVIES = ""
// MOVIES
export const NOW_PLAYING_MOVIES_URL = `${BASE_URL}/movie/now_playing?language=en-US&page=1&region=IN&api_key=${API_KEY}`;
export const TOP_RATED_MOVIES_URL = `${BASE_URL}/movie/top_rated?language=en-US&page=1&region=IN&api_key=${API_KEY}`;
export const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?language=en-US&page=1&region=IN&api_key=${API_KEY}`;
export const UPCOMING_MOVIES_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=IN`;
