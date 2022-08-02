import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router";
import { useData } from "../contexts/DataContext";
import defaultPoster from "../assets/images/blank-poster.jpg";

const SearchCard = ({ id, img, name, media_type, date, rating, voteCount }) => {
  const { type } = useData();
  const navigate = useNavigate();

  const getMoreInfo = () => {
    console.log("media", media_type);
    console.log("type", type);
    if (type === "movie") {
      navigate(`/${type}/${id}`);
    } else if (type === "tv") {
      navigate(`/${type}/${id}`);
    } else if (type === "person") {
      navigate(`/${type}/${id}`);
    } else navigate(`/${media_type}/${id}`);
  };
  return (
    <div
      onClick={getMoreInfo}
      className="shadow-lg cursor-pointer mx-auto w-[200px] max-w-[90%] my-2"
    >
      <div className="w-[200px]">
        <img
          src={img ? `https://image.tmdb.org/t/p/w500/${img}` : defaultPoster}
          alt="search"
          className="shadow-lg rounded max-w-full h-auto align-middle border-none"
        />
      </div>
      <div>
        <h4>{name}</h4>
        <p>{date?.substring(0, 4)}</p>
        <p className="capitalize">
          {media_type === "person" ? "Actor" : media_type}
        </p>
        <div>
          {rating ? (
            <div className="flex items-center mt-1 space-x-2">
              <FontAwesomeIcon size="2x" icon={faImdb} color="#f3ce13" />
              <p className="font-bold">{rating}</p>
              <p>({voteCount})</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
