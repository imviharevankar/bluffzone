import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { useNavigate } from "react-router-dom";
import personAvatar from "../assets/images/personavatar.jpg";

const PersonCard = ({ name, img, character, id, episodes, popularity }) => {
  const navigate = useNavigate();

  const navigateToPerson = () => {
    navigate(`/person/${id}`);
  };

  return (
    <div
      onClick={navigateToPerson}
      className="cursor-pointer drop-shadow-lg my-5 mx-2"
    >
      <div className="w-[120px]">
        <img
          src={img ? `https://image.tmdb.org/t/p/w500/${img}` : personAvatar}
          className="shadow-xl rounded max-w-full h-[10em] align-middle border-none"
          alt="poster"
        />
      </div>
      <div>
        <p className="text-sm border  font-semibold text-center hover:text-red-400">
          {name}
        </p>
        <p className="text-xs text-center hover:text-red-400 text-gray-400">
          {character}
        </p>
        <p className="text-xs text-center ">
          {episodes ? `${episodes} Episodes` : null}
        </p>
        <p className="text-xs flex items-center justify-center space-x-1">
          {popularity ? (
            <div>
              <FavoriteIcon className="text-red-600" fontSize="small" />
              <span>{`${popularity} %`}</span>
            </div>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default PersonCard;
