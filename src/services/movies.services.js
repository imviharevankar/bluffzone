import { NOW_PLAYING_MOVIES_URL, POPULAR_MOVIES_URL, TOP_RATED_MOVIES_URL, UPCOMING_MOVIES_URL } from "../api/api";
import { getAxios } from "../helper/customAxios";


export const fetchNowPlayingMovies = () => {
  return getAxios(NOW_PLAYING_MOVIES_URL);
};

export const fetchTopRatedMovies = () => {
  return getAxios(TOP_RATED_MOVIES_URL);
};

export const fetchPopularMovies = () => {
  return getAxios(POPULAR_MOVIES_URL);
};

export const fetchUpcomingMovies = () => {
  return getAxios(UPCOMING_MOVIES_URL);
};