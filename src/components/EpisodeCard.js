import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const EpisodeCard = ({
  seriesID,
  episodeImg,
  episodeAirDate,
  episodeRuntime,
  episodeName,
  episodeNum,
  seasonNum,
  overview,
}) => {
  const navigate = useNavigate();
  const navigateToEpisode = () => {
    navigate(`/tv/${seriesID}/season/${seasonNum}/episode/${episodeNum}`);
  };
  return (
    <div
      onClick={navigateToEpisode}
      className="cursor-pointer rounded-lg shadow-xl my-2   w-[90%] max-w-[800px] mx-auto"
    >
      {/* <Box
        component="img"
        src={episodeImg}
        sx={{
          maxHeight: "40vw",
          maxWidth: "30vw",
          height: { xs: "40vw", md: "20vw", lg: "20vw" },
          width: { xs: "30vw", md: "15vw", lg: "15vw" },
          marginTop: { xs: "-20vw", md: "-10vw", lg: "-10vw" },
        }}
        className="ml-2 lg:ml-5 shadow-xl hover:shadow-2xl"
      /> */}
      <div className="flex xsm:flex-col">
        <Box
          component="img"
          src={episodeImg}
          sx={{
            maxWidth: "400px",
            width: { sm: "100%", md: "40%" },
            boxShadow: 3,

            // height: "100%",
            // maxWidth: "400px",
            // aspectRatio: "4/3",
            // width: { sm: "100%", md: "30%" },
            // maxHeight: "40",
            // maxWidth: "30vw",
            // height: { xs: "40vw", md: "20vw", lg: "20vw" },
            // width: { xs: "30vw", md: "15vw", lg: "15vw" },
            // marginTop: { xs: "-20vw", md: "-10vw", lg: "-10vw" },
          }}
          className="relative rounded-lg"
        />
        {/* <div className="relative">
          <img
            src={episodeImg}
            className="object-cover h-20"
            alt="server-img"
          />
        </div> */}
        <div className="pl-2 my-1">
          <p className="text-xs opacity-80 text-gray-400">
            {seasonNum} x
            {episodeNum?.length === 1 ? episodeNum : `0${episodeNum}`}
          </p>
          <p className="xsm:text-lg text-xl font-semibold -mt-1">
            {episodeName}
          </p>
          <p className="text-sm">{episodeAirDate}</p>
          <p className="text-sm">{episodeRuntime} mins</p>
          <p className="text-xs">{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
