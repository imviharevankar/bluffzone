import React from "react";

const StatCard = ({ episodes, movies, time, icon, series, type }) => {
  const day = Math.floor(time / (60 * 24));
  const hour = Math.floor((time % (60 * 24)) / 60);
  const min = Math.floor(time % 60);

  return (
    <div className="w-[90%] mx-auto max-w-[400px] border-2 my-2 border-blue-500 flex flex-row xsm:flex-col px-1">
      <p>{icon}</p>
      <div>
        <p>
          <span className="text-sm font-bold">
            {day ? <span>{`${day} Days, `}</span> : null}
            <span>{`${hour} Hours, `}</span>
            <span>{`${min} Mins, `}</span>
          </span>
          {type === "watchlist" ? (
            <span>to be watched</span>
          ) : (
            <span>watching</span>
          )}
        </p>
        {episodes && series ? (
          <p>
            <span className="text-sm font-bold"> {episodes} </span>
            episodes of
            <span className="text-sm font-bold"> {series} </span>
            shows
          </p>
        ) : null}

        {movies ? (
          <p>
            <span className="text-sm font-bold"> {movies} </span> movies
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default StatCard;
