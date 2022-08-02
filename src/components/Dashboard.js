import React, { useEffect } from "react";
import StatCard from "../components/StatCard";
import TvIcon from "@material-ui/icons/Tv";
import VideoCamIcon from "@material-ui/icons/Videocam";
import TheatresIcon from "@material-ui/icons/Theaters";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlist } from "../redux/actions/watchlistActions";
import MovieCard from "./MovieCard";

const Dashboard = () => {
  const user = useSelector((state) => state.auth);
  const watchlist = useSelector((state) => state?.watchlist);
  console.log(watchlist);
  const dispatch = useDispatch();

  const date = new Date(user?.createdAt * 1000);

  const joined = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);

  const runtimeArr = watchlist?.map((item) => {
    console.log(item);
    return item?.media.runtime;
  });

  const runtime = runtimeArr.reduce((a, b) => a + b, 0);

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);
  return (
    <div>
      <div className="flex flex-col pl-5">
        <h1 className="text-md">
          Hello, <span className="text-xl font-bold">{user?.username}</span>
        </h1>
        <p className="text-xs mb-2 opacity-60">Member since {joined} </p>
      </div>

      <div className="flex flex-row xsm:flex-col  overflow-x-scroll scrollbar-hide">
        <StatCard
          icon={
            <TvIcon
              fontSize="large"
              style={{
                backgroundColor: "red",
                borderRadius: "50%",
                width: "2.5rem",
                height: "2.5rem",
                padding: "5px",
              }}
            />
          }
          time={"48 days, 5 hours, 59 mins "}
          episodes={1929}
          series={58}
        />
        <StatCard
          icon={
            <VideoCamIcon
              fontSize="large"
              style={{
                backgroundColor: "blue",
                borderRadius: "50%",
                width: "2.5rem",
                height: "2.5rem",
                padding: "5px",
              }}
            />
          }
          time={runtime}
          movies={watchlist?.length}
        />
        <StatCard
          icon={
            <TheatresIcon
              fontSize="large"
              style={{
                backgroundColor: "green",
                borderRadius: "50%",
                width: "2.5rem",
                height: "2.5rem",
                padding: "5px",
              }}
            />
          }
          time={"xx days, xx hours "}
          episodes={1929}
          series={58}
          movies={142}
          type="watclist"
        />
      </div>
      <p>Recently Watched Movies</p>
      <p>Recently Watched Series</p>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-10 mx-2 my-2">
        {watchlist?.slice(0, 10)?.map((item) => (
          <MovieCard
            key={item?.media?.imdb_id}
            id={item?.media?.id}
            img={item?.media?.poster_path}
            name={item?.media?.title}
            date={item?.media?.release_date}
            runtime={item?.media?.runtime}
            rating={item?.media?.vote_average}
            voteCount={item?.media?.vote_count}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
