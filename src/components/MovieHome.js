import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useModal } from "../contexts/ModalContext";

const MovieHome = () => {
  const API_KEY = process?.env?.REACT_APP_API_KEY;
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
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

  const fetchNowPlaying = () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=IN`;

    axios
      .get(url)
      .then((response) => {
        // console.log(response?.data?.results);
        setNowPlaying(response?.data?.results);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  const fetchPopular = () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1&region=IN`;

    axios
      .get(url)
      .then((response) => {
        setPopular(response?.data?.results);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  const fetchTopRated = () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=IN`;

    axios
      .get(url)
      .then((response) => {
        setTopRated(response?.data?.results);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  const fetchUpcoming = () => {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=IN`;

    axios
      .get(url)
      .then((response) => {
        setUpcoming(response?.data?.results);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  const fetchData = () => {
    fetchGenres();
    fetchGenreList();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    fetchUpcoming();
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      <div className="flex overflow-x-scroll scrollbar-hide space-x-10 my-2 mx-2">
        {genreMovieList?.map((item) => (
          <MovieCard
            id={item?.id}
            img={item?.poster_path}
            name={item?.title}
            date={item?.release_date}
            runtime={item?.runtime}
            rating={item?.vote_average}
            genres={item?.genres}
            voteCount={item?.vote_count}
          />
        ))}
      </div>
      <div>
        <p className="font-ubuntu hover:underline px-2 text-xl text-red-400 my-2 cursor-pointer">
          Now Playing
        </p>
        <div className="flex  overflow-x-scroll scrollbar-hide my-2 mx-2 space-x-10">
          {nowPlaying?.map((item) => (
            <MovieCard
              key={item?.imdb_id}
              id={item?.id}
              img={item?.poster_path}
              name={item?.title}
              date={item?.release_date}
              runtime={item?.runtime}
              rating={item?.vote_average}
              voteCount={item?.vote_count}
            />
          ))}
        </div>
        <p className="hover:underline px-2 text-xl text-indigo-400 my-2 cursor-pointer">
          Popular movies
        </p>
        <div className="flex overflow-x-scroll scrollbar-hide space-x-10 mx-2 my-2">
          {popular?.map((item) => (
            <MovieCard
              key={item?.imdb_id}
              id={item?.id}
              img={item?.poster_path}
              name={item?.title}
              date={item?.release_date}
              runtime={item?.runtime}
              rating={item?.vote_average}
              voteCount={item?.vote_count}
            />
          ))}
        </div>

        <p className="hover:underline px-2 text-xl text-indigo-400 my-2  cursor-pointer">
          Top Rated Movies
        </p>
        <div className="flex overflow-x-scroll scrollbar-hide space-x-10 mx-2 my-2">
          {topRated?.map((item) => (
            <MovieCard
              key={item?.imdb_id}
              id={item?.id}
              img={item?.poster_path}
              name={item?.title}
              date={item?.release_date}
              runtime={item?.runtime}
              rating={item?.vote_average}
              voteCount={item?.vote_count}
            />
          ))}
        </div>

        <p className="hover:underline px-2 text-xl text-indigo-400 my-2 cursor-pointer">
          Upcoming Movies
        </p>
        <div className="flex cursor-pointer overflow-x-scroll scrollbar-hide my-2 mx-2 space-x-10 pb-10">
          {upcoming?.map((item) => (
            <MovieCard
              key={item?.imdb_id}
              id={item?.id}
              img={item?.poster_path}
              name={item?.title}
              date={item?.release_date}
              runtime={item?.runtime}
              rating={item?.vote_average}
              voteCount={item?.vote_count}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieHome;
