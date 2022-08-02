import React from "react";
import { useParams } from "react-router";
import { useData } from "../contexts/DataContext";
import SearchCard from "./SearchCard";

const SearchResult = () => {
  const { query } = useParams();
  const { data } = useData();
  return (
    <div className="mt-2">
      <p className="px-2">
        Found <span className="font-semibold">{data?.total_results} </span>
        results for '<span className="font-semibold">{query}</span>'
      </p>
      <p>
        Page {data?.page} of {data?.total_pages}
      </p>
      <div className="gridCards">
        {data?.results?.map((item) => (
          <SearchCard
            key={item?.id}
            id={item?.id}
            img={item?.poster_path || item?.profile_path}
            name={item?.title || item?.name}
            media_type={item?.media_type}
            rating={item?.vote_average}
            voteCount={item?.vote_count}
            date={item?.release_date || item?.first_air_date}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
