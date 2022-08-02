import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import EpisodeCard from "../components/EpisodeCard";

const SeasonInfo = () => {
  const { id, num } = useParams();
  const navigate = useNavigate();
  const API_KEY = "e547e17d4e91f3e62a571655cd1ccaff";

  const [seasonData, setSeasonData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  const fetchSeasonDetails = () => {
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${num}?api_key=${API_KEY}&language=en-US`;

    axios
      .get(url)
      .then((response) => {
        console.log(response?.data);
        setSeasonData(response?.data);
      })
      .catch((err) => console.log(err.message));
  };

  const fetchSeriesDetails = () => {
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        setSeriesData(response.data);
      })
      .catch((err) => console.log(err.message));
  };

  // const navigateToEpisode = (epi_num) => {
  //   navigate(`/tv/${id}/season/${num}/episode/${epi_num}`);
  // };

  useEffect(() => {
    fetchSeasonDetails();
    fetchSeriesDetails();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <div className="flex">
        <Box
          component="img"
          src={`https://image.tmdb.org/t/p/w500/${seasonData?.poster_path}`}
          sx={{
            maxHeight: "40vw",
            maxWidth: "30vw",
            height: { xs: "40vw", md: "20vw", lg: "20vw" },
            width: { xs: "30vw", md: "15vw", lg: "15vw" },
          }}
          className="ml-2 lg:ml-5 my-2  hover:shadow-2xl"
        />
        <div>
          <p>{seriesData?.name}</p>
          <p>{seasonData?.name}</p>
          <p>{seasonData?.air_date?.substring(0, 4)}</p>
        </div>
      </div>

      <p className="mx-auto w-[90%] max-w-[800px] xsm:text-lg font-bold text-2xl my-1">
        Episodes ({seasonData?.episodes?.length})
      </p>
      {seasonData?.episodes?.map((item) => (
        <EpisodeCard
          seriesID={id}
          episodeImg={`https://image.tmdb.org/t/p/w500/${item?.still_path}`}
          seasonNum={num}
          episodeNum={item?.episode_number}
          episodeRuntime={seriesData?.episode_run_time?.[0]}
          episodeName={item?.name}
          episodeAirDate={item?.air_date}
          overview={item?.overview}
        />
        // <div
        //   onClick={() => navigateToEpisode(item?.episode_number)}
        //   className="cursor-pointer shadow-xl"
        // >
        //   <div className="flex">
        //     <div className="relative">
        //       <img
        //         src={`https://image.tmdb.org/t/p/w500/${item?.still_path}`}
        //         className="object-cover h-20"
        //         alt="server-img"
        //       />
        //     </div>
        //     <div>
        //       <p>
        //         {num} x
        //         {item?.episode_number?.length === 1
        //           ? item?.episode_number
        //           : `0${item?.episode_number}`}
        //       </p>
        //       <p>{item?.name}</p>
        //       <p>{item?.air_date}</p>
        //       <p>{seriesData?.episode_run_time?.[0]} mins</p>
        //       <p>{item?.overview}</p>
        //     </div>
        //   </div>
        // </div>
      ))}
    </div>
  );
};

export default SeasonInfo;
