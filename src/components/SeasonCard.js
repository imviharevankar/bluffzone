import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SeasonCard = ({
  seriesID,
  seasonNum,
  seasonImg,
  seasonName,
  seasonCount,
}) => {
  const navigate = useNavigate();
  const navigateToSeason = () => {
    navigate(`/tv/${seriesID}/season/${seasonNum}`);
  };
  return (
    <div onClick={navigateToSeason} className="w-[350px] border border-black">
      <Box component="img" src={seasonImg} className="relative rounded-lg" />
      <p className="text-center">{seasonName}</p>
      <p className="text-center">{seasonCount} Episodes</p>
    </div>
  );
};

export default SeasonCard;
