import axios from "axios";
import React, { useEffect, useState } from "react";
import { useModal } from "../contexts/ModalContext";
import PersonCard from "./PersonCard";

const MovieHome = () => {
  const API_KEY = "e547e17d4e91f3e62a571655cd1ccaff";
  const [popular, setPopular] = useState([]);
  const { setLoaderModal } = useModal();

  const fetchPopular = () => {
    setLoaderModal(true);
    const url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1&region=IN`;

    axios
      .get(url)
      .then((response) => {
        setLoaderModal(false);
        setPopular(response?.data?.results);
      })
      .catch((err) => {
        setLoaderModal(false);
        console.log(err?.message);
      });
  };

  useEffect(() => {
    fetchPopular();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <div className="my-1">
        <p className="link hover:underline px-2 text-xl text-indigo-400 cursor-pointer">
          Trending People
        </p>
        <div className="flex xs:justify-center sm: justify-start items-center flex-wrap scrollbar-hide">
          {popular?.map((item) => (
            <PersonCard
              id={item?.id}
              key={item?.id}
              img={item?.profile_path}
              name={item?.name}
              popularity={Math.floor(item?.popularity)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieHome;
