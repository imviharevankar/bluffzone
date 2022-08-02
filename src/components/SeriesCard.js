import React from "react";
import { useNavigate } from "react-router";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb } from "@fortawesome/free-brands-svg-icons";

const SeriesCard = ({ id, img, name, runtime, rating, date, voteCount }) => {
  const navigate = useNavigate();
  const navigateToSeries = () => {
    navigate(`/tv/${id}`);
  };
  return (
    <div
      className="cursor-pointer w-[250px] xsm:w-[150px] border"
      onClick={navigateToSeries}
    >
      <div className="w-[250px] xsm:w-[150px]">
        <img
          src={`https://image.tmdb.org/t/p/w500/${img}`}
          alt="poster"
          className="shadow-lg rounded aspect-video align-middle border-none h-[250px] w-full"
        />
      </div>
      <div className="my-1 flex justify-around items-center">
        <IconButton>
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <DoneOutlineIcon fontSize="small" />
        </IconButton>
      </div>
      <div className="px-2">
        <div className="mt-1">
          <p className="font-semibold text-base text-blue-700 truncate">
            {name}
          </p>
          {rating ? (
            <div className="flex items-center mt-1 space-x-1">
              <FontAwesomeIcon
                style={{ fontSize: "1.5rem" }}
                icon={faImdb}
                color="#f3ce13"
              />
              <p className="font-semibold text-sm">{rating.toFixed(1)}</p>
              <p className="text-sm">({voteCount})</p>
            </div>
          ) : null}
        </div>
        <p className="text-xs mt-[4px] text-gray-700">{date}</p>
      </div>
    </div>
  );
};

export default SeriesCard;
