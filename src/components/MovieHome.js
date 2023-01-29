import axios from "axios";
import { useEffect, useState } from "react";
import { useModal } from "../contexts/ModalContext";
import { fetchNowPlayingMovies, fetchPopularMovies } from "../services/movies.services";
import { resources } from "../utils/resources";
import MovieCategoryCard from "./MovieCategoryCard";

const MovieHome = () => {
  const API_KEY = process?.env?.REACT_APP_API_KEY;
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [genreMovieList, setGenreMovieList] = useState([]);
  const [genres, setGenres] = useState([]);

  const [active, setActive] = useState("Action");

  const { setLoaderModal } = useModal();

  const fetchGenres = () => {
    setLoaderModal(true);

    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

    axios
      .get(url)
      .then((response) => {
        setLoaderModal(false);
        setGenres(response?.data?.genres);
      })
      .catch((err) => {
        setLoaderModal(false);
        console.log(err?.message);
      });
  };

  const fetchGenreList = (genreID) => {
    setLoaderModal(true);
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreID}
    `;
    axios
      .get(url)
      .then((response) => {
        setLoaderModal(false);
        setGenreMovieList(response?.data?.results);
      })
      .catch((err) => {
        setLoaderModal(false);
        console.log(err?.message);
      });
  };

  const getNowPlayingMovies = async () => {
    try {
      const response = await fetchNowPlayingMovies();
      if (response.status === 200) {
        setNowPlayingMovies(response?.data?.results);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getTopRatedMovies = async () => {
    try {
      const response = await fetchNowPlayingMovies();
      if (response.status === 200) {
        setTopRatedMovies(response?.data?.results);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getPopularMovies = async () => {
    try {
      const response = await fetchPopularMovies();
      if (response.status === 200) {
        setPopularMovies(response?.data?.results);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getUpcomingMovies = async () => {
    try {
      const response = await fetchNowPlayingMovies();
      if (response.status === 200) {
        setUpcomingMovies(response?.data?.results);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = () => {
    fetchGenres();
    fetchGenreList();
  };

  useEffect(() => {
    fetchData();
    getNowPlayingMovies();
    getTopRatedMovies();
    getPopularMovies();
    getUpcomingMovies();
  }, []);

  return (
    <div>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-5 my-2">
        {genres?.map((item) => (
          <button
            onClick={() => {
              fetchGenreList(item?.id);
              setActive(item?.name);
            }}
            className={
              active === `${item?.name}`
                ? "action__btn bg-red-600"
                : "action__btn"
            }
          >
            {item?.name}
          </button>
        ))}
      </div>
      <MovieCategoryCard title="" arr={genreMovieList} />
      <MovieCategoryCard title={resources?.nowPlaying} arr={nowPlayingMovies} />
      <MovieCategoryCard title={resources?.popularMovies} arr={popularMovies} />
      <MovieCategoryCard title={resources?.topRatedMovies} arr={topRatedMovies} />
      <MovieCategoryCard title={resources?.upcomingMovies} arr={upcomingMovies} />
    </div>
  );
};

export default MovieHome;
