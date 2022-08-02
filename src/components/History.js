import React, { useEffect } from "react";
import MovieCard from "./MovieCard";
import { useData } from "../contexts/DataContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlist } from "../redux/actions/watchlistActions";

const History = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist);
  console.log("watchlist", watchlist);
  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);
  return (
    <div>
      {watchlist?.map((item) => (
        <MovieCard
          key={item?.media?.imdb_id}
          name={item?.media?.title}
          id={item?.media?.id}
          img={item?.media?.poster_path}
          runtime={item?.media?.runtime}
          createdAt={item?.createdAt}
        />
      ))}
    </div>
  );
};

export default History;
