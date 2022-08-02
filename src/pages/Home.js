import React, { useState } from "react";
import MovieHome from "../components/MovieHome";
import SeriesHome from "../components/SeriesHome";
import PersonHome from "../components/PersonHome";
import LoaderModal from "../components/LoaderModal";
import { useModal } from "../contexts/ModalContext";

const Home = () => {
  const [active, setActive] = useState("movie");
  const { loaderModal } = useModal();

  return (
    <div className="bg-[#F8F8FF]">
      <div className="flex items-center justify-center space-x-10">
        <button
          onClick={() => setActive("movie")}
          className={
            active === "movie" ? "action__btn bg-red-500" : "action__btn"
          }
        >
          Movies
        </button>
        <button
          onClick={() => setActive("tv")}
          className={active === "tv" ? "action__btn bg-red-500" : "action__btn"}
        >
          Series
        </button>
        <button
          onClick={() => setActive("person")}
          className={
            active === "person" ? "action__btn bg-red-500" : "action__btn"
          }
        >
          People
        </button>
      </div>
      {active === "movie" ? <MovieHome /> : null}
      {active === "tv" ? <SeriesHome /> : null}
      {active === "person" ? <PersonHome /> : null}
    </div>
  );
};

export default Home;
