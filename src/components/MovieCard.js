import React from "react";
import { useNavigate } from "react-router";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import defaultPoster from "../assets/images/blank-poster.jpg";

const MovieCard = ({
  id,
  img,
  name,
  runtime,
  rating,
  date,
  voteCount,
  createdAt,
}) => {
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  const navigateToMovie = () => {
    navigate(`/movie/${id}`);
    window.scrollTo(0, 0);
  };

  const addToFavorites = (e) => {
    e.stopPropagation();

    if (!auth?._id) {
      navigate("/sign-in");
    }
  };

  const addToWatched = (e) => {
    e.stopPropagation();

    if (!auth?._id) {
      navigate("/sign-in");
    }
  };
  return (
    <div
      onClick={navigateToMovie}
      className="cursor-pointer w-[250px] xsm:w-[150px] border"
    >
      <div className="w-[250px] xsm:w-[150px]">
        <img
          src={img ? `https://image.tmdb.org/t/p/w500/${img}` : defaultPoster}
          className="shadow-lg rounded aspect-video align-middle border-none h-[250px] w-full"
          alt="movie-poster"
        />
      </div>
      {new Date() >= new Date(date) ? (
        <div className="my-1 flex justify-around items-center">
          <IconButton onClick={(e) => addToFavorites(e)}>
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={(e) => addToWatched(e)}>
            <DoneOutlineIcon fontSize="small" />
          </IconButton>
        </div>
      ) : null}

      <div className="mt-2 px-2">
        <p className="font-semibold text-base text-blue-700 truncate">{name}</p>
        <div className="flex items-center justify-between">
          <div>
            {rating ? (
              <div className="flex items-center mt-1 space-x-1">
                <FontAwesomeIcon
                  style={{ fontSize: "1.5rem" }}
                  icon={faImdb}
                  color="#f3ce13"
                />
                <p className="font-semibold text-sm">{rating}</p>
                <p className="text-sm">({voteCount})</p>
              </div>
            ) : null}
          </div>
          <div>
            {runtime ? <p className="text-xs">{runtime} mins</p> : null}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-700">{date}</p>
        </div>
      </div>

      {createdAt ? (
        <p className="space-x-1 text-sm text-purple-400">
          <span>
            {new Intl.DateTimeFormat("en-IN", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(createdAt * 1000)}
          </span>
          <span className="uppercase">
            {new Intl.DateTimeFormat("en-IN", {
              timeStyle: "short",
            }).format(createdAt * 1000)}
          </span>
        </p>
      ) : null}
    </div>
  );
};

export default MovieCard;
