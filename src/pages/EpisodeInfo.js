import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PersonCard from "../components/PersonCard";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BeenhereIcon from "@mui/icons-material/Beenhere";

const EpisodeInfo = () => {
  const { id, num, epi_num } = useParams();

  const API_KEY = "e547e17d4e91f3e62a571655cd1ccaff";
  const [episodeData, setEpisodeData] = useState([]);
  const [active, setActive] = useState("regular");
  const [cast, setCast] = useState([]);
  const [guest, setGuest] = useState([]);

  const fetchEpisodeDetails = () => {
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${num}/episode/${epi_num}?api_key=${API_KEY}&language=en-US`;

    axios
      .get(url)
      .then((response) => {
        // console.log(response?.data);
        setEpisodeData(response?.data);
        setGuest(response?.data?.guest_stars);
      })
      .catch((err) => console.log(err.message));
  };

  const fetchCast = () => {
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${num}/episode/${epi_num}/credits?api_key=${API_KEY}&language=en-US`;
    axios
      .get(url)
      .then((response) => {
        console.log(response?.data?.cast);
        setCast(response?.data?.cast);
        setGuest(response?.data?.crew);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    fetchEpisodeDetails();
    fetchCast();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="border px-2 border-black flex xsm:flex-col">
        <Box
          component="img"
          src={`https://image.tmdb.org/t/p/w500/${episodeData?.still_path}`}
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
        <div className="md:pl-5 my-1">
          <p>
            <span>
              {num} x
              {episodeData?.episode_number?.length === 1
                ? ` ${episodeData?.episode_number} `
                : ` 0${episodeData?.episode_number} `}
            </span>
          </p>
          <p className="xsm:text-lg text-xl font-semibold -mt-1">
            {episodeData?.name}
          </p>
          <p>{episodeData?.air_date}</p>
          <p>{episodeData?.overview}</p>

          <div className="flex flex-col">
            <Button
              endIcon={<BookmarkAddIcon />}
              sx={{ marginY: "5px", width: "90%", maxWidth: "400px" }}
              variant="outlined"
            >
              Add to Watchlist
            </Button>
            <Button
              sx={{ marginY: "5px" }}
              variant="outlined"
              endIcon={<BeenhereIcon />}
            >
              Watched
            </Button>
            <Button
              endIcon={<FavoriteBorderIcon />}
              sx={{ marginY: "5px" }}
              variant="contained"
            >
              Add to Favorites
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <p
          className={
            active === "regular"
              ? "tabs__panel bg-blue-400 hover:bg-blue-400"
              : "tabs__panel border border-black"
          }
          onClick={() => setActive("regular")}
        >
          CAST (<span>{cast?.length}</span>)
        </p>
        <p
          className={
            active === "guest"
              ? "tabs__panel bg-blue-400 hover:bg-blue-400"
              : "tabs__panel border border-black"
          }
          onClick={() => {
            if (guest) {
              setActive("guest");
              console.log(active);
            } else return null;
          }}
        >
          GUEST STARS (<span>{guest?.length}</span>)
        </p>
      </div>

      <div className="flex justify-evenly sm:justify-start flex-wrap scrollbar-hide">
        {active === "guest" &&
          guest?.map((item) => (
            <PersonCard
              key={item?.id}
              id={item?.id}
              name={item?.original_name}
              img={item?.profile_path}
              character={item?.character}
            />
          ))}
        {active === "regular" &&
          cast?.map((item) => (
            <PersonCard
              key={item?.id}
              id={item?.id}
              name={item?.original_name}
              img={item?.profile_path}
              character={item?.character}
            />
          ))}
      </div>
    </div>
  );
};

export default EpisodeInfo;
