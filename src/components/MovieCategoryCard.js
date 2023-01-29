import MovieCard from "./MovieCard";

const MovieCategoryCard = ({ title, arr }) => {
  return (
    <>
      <p className="hover:underline px-2 text-xl text-indigo-400 my-2  cursor-pointer">
        {title}
      </p>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-10 mx-2 my-2">
        {arr?.map((item) => (
          <MovieCard
            key={item?.imdb_id}
            id={item?.id}
            img={item?.poster_path}
            name={item?.title}
            date={item?.release_date}
            runtime={item?.runtime}
            rating={item?.vote_average}
            voteCount={item?.vote_count}
          />
        ))}
      </div>
    </>
  );
};

export default MovieCategoryCard;
