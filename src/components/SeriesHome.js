import axios from "axios";
import React, { useEffect, useState } from "react";
import SeriesCard from "../components/SeriesCard";

const SeriesHome = () => {
  const API_KEY = "e547e17d4e91f3e62a571655cd1ccaff";
  const [onAir, setOnAir] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const [genreList, setGenreList] = useState([]);
  const [genres, setGenres] = useState([]);

  const [active, setActive] = useState("Action & Adventure");

  const fetchGenres = () => {
    const url = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;

    axios
      .get(url)
      .then((response) => {
        setGenres(response?.data?.genres);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  const fetchGenreList = (genreID) => {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreID}
    `;
    axios
      .get(url)
      .then((response) => {
        setGenreList(response?.data?.results);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  const fetchOnAir = () => {
    const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`;

    axios
      .get(url)
      .then((response) => {
        setOnAir(response?.data?.results);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  const fetchAiringToday = () => {
    const url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`;

    axios
      .get(url)
      .then((response) => {
        setAiringToday(response?.data?.results);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  const fetchPopular = () => {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1&region=IN`;

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
    const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=IN`;

    axios
      .get(url)
      .then((response) => {
        setTopRated(response?.data?.results);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  useEffect(() => {
    fetchGenres();
    fetchOnAir();
    fetchAiringToday();
    fetchPopular();
    fetchTopRated();
  }, []);
  return (
    <div>
      <div className="flex items-center overflow-x-scroll scrollbar-hide space-x-10 mt-2">
        {genres?.map((item) => (
          <button
            key={item?.id}
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
      <div className="flex cursor-pointer overflow-x-scroll scrollbar-hide space-x-10">
        {genreList?.map((item) => (
          <SeriesCard
            id={item?.id}
            img={item?.poster_path}
            name={item?.name}
            date={item?.first_air_date}
            runtime={item?.runtime}
            rating={item?.vote_average}
            voteCount={item?.vote_count}
          />
        ))}
      </div>
      <div>
        <p className="hover:underline px-2 text-xl text-indigo-400 my-2 cursor-pointer">
          On Air
        </p>
        <div className="flex cursor-pointer overflow-x-scroll scrollbar-hide space-x-10">
          {onAir?.map((item) => (
            <SeriesCard
              id={item?.id}
              img={item?.poster_path}
              name={item?.name}
              date={item?.first_air_date}
              runtime={item?.runtime}
              rating={item?.vote_average}
              voteCount={item?.vote_count}
            />
          ))}
        </div>
        <p className="link hover:underline px-2 text-xl text-indigo-400 my-2 cursor-pointer">
          Airing Today
        </p>
        <div className="flex cursor-pointer overflow-x-scroll scrollbar-hide space-x-10">
          {airingToday?.map((item) => (
            <SeriesCard
              id={item?.id}
              img={item?.poster_path}
              name={item?.name}
              date={item?.first_air_date}
              runtime={item?.runtime}
              rating={item?.vote_average}
              voteCount={item?.vote_count}
            />
          ))}
        </div>
        <p className="link hover:underline px-2 text-xl text-indigo-400 my-2 cursor-pointer">
          Popular Series
        </p>
        <div className="flex cursor-pointer overflow-x-scroll scrollbar-hide space-x-10">
          {popular?.map((item) => (
            <SeriesCard
              id={item?.id}
              img={item?.poster_path}
              name={item?.name}
              date={item?.first_air_date}
              runtime={item?.runtime}
              rating={item?.vote_average}
              voteCount={item?.vote_count}
            />
          ))}
        </div>

        <p className="hover:underline px-2 text-xl text-indigo-400 my-2 cursor-pointer">
          Top Rated Series
        </p>
        <div className="flex cursor-pointer overflow-x-scroll scrollbar-hide space-x-10 pb-10">
          {topRated?.map((item) => (
            <SeriesCard
              id={item?.id}
              img={item?.poster_path}
              name={item?.name}
              date={item?.first_air_date}
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

export default SeriesHome;
