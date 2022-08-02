import { Box, Card, CardMedia } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PersonCard from "../components/PersonCard";
import SeasonCard from "../components/SeasonCard";
import SeriesCard from "../components/SeriesCard";

const SeriesInfo = () => {
  const API_KEY = "e547e17d4e91f3e62a571655cd1ccaff";

  const { id } = useParams();
  const navigate = useNavigate();

  const [seriesData, setSeriesData] = useState([]);
  const [cast, setCast] = useState([]);
  const [buy, setBuy] = useState([]);
  const [flatrate, setFlatrate] = useState([]);
  const [genres, setGenres] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [contentRating, setContentRating] = useState("");
  const [airedDate, setAiredDate] = useState();
  const [runtime, setRuntime] = useState();

  const totalRuntime =
    seriesData?.number_of_episodes * seriesData?.episode_run_time?.[0];

  const day = Math.floor(totalRuntime / 1440);
  const hour = Math.floor((totalRuntime - day * 1440) / 60);
  const minute = Math.round(totalRuntime % 60);

  const getSeriesInfo = (ID = id) => {
    const url = `https://api.themoviedb.org/3/tv/${ID}?api_key=${API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        setSeriesData(response.data);
        setGenres(response?.data?.genres);
        console.log(response?.data);
        setAiredDate(new Date(response?.data?.first_air_date));
        setRuntime(response?.data?.episode_run_time[0]);
      })
      .catch((err) => console.log(err.message));
  };

  const getWatchProviders = () => {
    const url = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        setBuy(response?.data?.results?.IN?.buy);
        setFlatrate(response?.data?.results?.IN?.flatrate);
      })
      .catch((err) => console.log(err.message));
  };

  const getCredits = () => {
    const url = `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${API_KEY}&language=en-US`;

    axios
      .get(url)
      .then((response) => {
        setCast(response?.data?.cast);
        console.log(response?.data);
        console.log(cast);
      })
      .catch((err) => console.log(err.message));

    // const url = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`;

    // axios
    //   .get(url)
    //   .then((response) => {
    //     setCast(response?.data?.cast);
    //     console.log(response?.data);
    //   })
    //   .catch((err) => console.log(err.message));
  };

  const getRecommendations = () => {
    const url = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;

    axios
      .get(url)
      .then((response) => {
        setRecommendations(response?.data?.results);
      })
      .catch((err) => console.log(err.message));
  };

  const fetchContentRating = () => {
    const url = `https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${API_KEY}&language=en-US`;

    axios
      .get(url)
      .then((response) => {
        setContentRating(
          response?.data?.results?.find(({ iso_3166_1 }) => iso_3166_1 === "US")
        );
      })
      .catch((err) => console.log(err.message));
  };

  const navigateToSeason = (num) => {
    navigate(`/tv/${id}/season/${num}`);
  };

  const navigateToSeries = (sID) => {
    navigate(`/tv/${sID}`);
  };

  useEffect(() => {
    getCredits();
    getWatchProviders();
    getSeriesInfo();
    getRecommendations();
    fetchContentRating();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {/* <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center">
        <img
          src={`https://image.tmdb.org/t/p/w500/${seriesData?.backdrop_path}`}
          className="w-full h-auto"
          alt="server-img"
        />
      </div> */}

      <Box
        component="img"
        src={`https://image.tmdb.org/t/p/w500/${seriesData?.backdrop_path}`}
        sx={{
          maxHeight: "50vh",
          width: "100%",
          height: { xs: "25vh", md: "30vh", lg: "40vh" },
          zIndex: "-20",
        }}
      />

      <div className="border-2 border-red-800">
        <div className="flex">
          {/* <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500/${seriesData?.poster_path}`}
              className="object-cover h-20"
              alt="server-img"
            />
          </div> */}
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500/${seriesData?.poster_path}`}
            sx={{
              maxHeight: "40vw",
              maxWidth: "30vw",
              height: { xs: "40vw", md: "20vw", lg: "20vw" },
              width: { xs: "30vw", md: "15vw", lg: "15vw" },
              marginTop: { xs: "-20vw", md: "-10vw", lg: "-10vw" },
            }}
            className="ml-2 lg:ml-5 rounded-lg drop-shadow-2xl"
          />

          {/* series info */}
          <div className="pl-2">
            <h2 className="xsm:text-2xl xsm:text-red-200 text-4xl">
              {seriesData?.name} {contentRating?.rating}
            </h2>
            <div className="space-x-2">
              <span>PREMIERED</span>
              <span>
                {new Intl.DateTimeFormat("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })?.format(airedDate)}
              </span>
            </div>
            <div className="space-x-2">
              <span>RUNTIME</span>
              <span>{runtime} mins.</span>
            </div>
            <div className="space-x-1 text-xs">
              <span>TOTAL RUNTIME</span>

              <span>{day ? `${day}d,` : null}</span>
              <span>{hour ? `${hour}h,` : null}</span>
              <span>{minute ? `${minute}m` : null}</span>
              <span>({seriesData?.number_of_episodes} Episodes)</span>
            </div>
            {/* <p>{seriesData?.overview}</p> */}
          </div>
        </div>

        {/* Seasons */}
        <p className="xsm:pl-2 pl-5 xsm:text-lg text-2xl font-bold">
          {seriesData?.number_of_seasons} Seasons
        </p>

        <div className="flex cursor-pointer overflow-x-scroll scrollbar-hide space-x-5">
          {seriesData?.seasons?.reverse()?.map((item) => (
            <SeasonCard
              seriesID={id}
              seasonNum={item?.season_number}
              seasonImg={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
              seasonName={item?.name}
              seasonCount={item?.episode_count}
            />
          ))}
        </div>

        {/* <p>
        Runtime {hour} hours {minute} mins{" "}
        <span className="text-gray-400">
          {`(${seriesData?.number_of_episodes}
          episodes)`}
        </span>
      </p> */}

        <p className="px-2">ACTORS</p>
        <div className="flex px-2 space-x-5">
          <p>
            SERIES REGULARS{" "}
            <span className="border border-red-600 bg-red-700 text-white px-1 text-xs">
              {cast?.length}
            </span>
          </p>
          <p>GUEST STARS</p>
        </div>

        {/* <div className="flex space-x-5">
        <p
          className="cursor-pointer text-xs"
          onClick={() => setActive("regular")}
        >
          SEASON REGULARS (<span>{cast?.length}</span>)
        </p>
        <p
          className="cursor-pointer text-xs"
          onClick={() => setActive("guest")}
        >
          GUEST STARS (<span>{guest?.length}</span>)
        </p>
      </div> */}

        <div className="flex cursor-pointer overflow-x-scroll scrollbar-hide my-1 mx-2 space-x-10">
          {/* {cast?.map((item) => (
            <PersonCard
              key={item?.id}
              id={item?.id}
              img={item?.profile_path}
              name={item?.name}
              // character={item?.roles?.map(({ character }) => {
              //   return character;
              // })}
              character={item?.character}
              episodes={item?.total_episode_count}
            />
          ))} */}
        </div>
        {buy || flatrate ? (
          <div className="w-[100px] h-[100px]">
            {buy?.map((item) => (
              <img
                src={`https://image.tmdb.org/t/p/w500/${item?.logo_path}`}
                alt="server-img"
                className="object-fill"
              />
            ))}

            {flatrate?.map((item) => (
              <img
                src={`https://image.tmdb.org/t/p/w500/${item?.logo_path}`}
                alt="server-img"
              />
            ))}
          </div>
        ) : null}
        {recommendations ? (
          <div>
            <p>If you like {seriesData?.name}, check out...</p>
            <div className="flex cursor-pointer overflow-x-scroll scrollbar-hide space-x-10">
              {recommendations?.map((item) => (
                <SeriesCard
                  onClick={() => navigateToSeries(item?.id)}
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
        ) : null}
      </div>
    </div>
  );
};

export default SeriesInfo;
