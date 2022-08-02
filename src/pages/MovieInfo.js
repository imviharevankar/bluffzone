import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { setHeaders, url } from "../api";
import ActionCard from "../components/ActionCard";
import MovieCard from "../components/MovieCard";
import PersonCard from "../components/PersonCard";
import { useModal } from "../contexts/ModalContext";
import {
  addToWatchlist,
  fetchWatchlist,
  removeFromWatchlist,
} from "../redux/actions/watchlistActions";

const MovieInfo = () => {
  const API_KEY = "e547e17d4e91f3e62a571655cd1ccaff";

  const { id } = useParams();
  const { setLoaderModal } = useModal();
  const navigate = useNavigate();

  const watchlist = useSelector((state) => state?.watchlist);
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const [movieData, setMovieData] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  const [recommendations, setRecommendations] = useState([]);
  const [buy, setBuy] = useState([]);
  const [flatrate, setFlatrate] = useState([]);
  const [country, setCountry] = useState([]);
  const [studio, setStudio] = useState([]);

  let imdb = watchlist.find(
    ({ media }) => media?.imdb_id === movieData?.imdb_id
  );

  let writers = crew?.filter(({ department }) => department === "Writing");
  let directors = crew?.filter(({ job }) => job === "Director");

  const fetchMovieData = () => {
    setLoaderModal(true);
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response?.data);
        setMovieData(response?.data);
        setCountry(response?.data?.production_countries);
        setStudio(response?.data?.production_companies);
        setLoaderModal(false);
      })
      .catch((err) => {
        console.log(err?.message);
        setLoaderModal(false);
      });
  };

  const fetchCast = async () => {
    setLoaderModal(true);

    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;

    await axios
      .get(url)
      .then((response) => {
        setCast(response?.data?.cast);
        setCrew(response?.data?.crew);
        setLoaderModal(false);
      })
      .catch((err) => {
        setLoaderModal(false);

        console.log(err.message);
      });
  };
  const fetchWatchProviders = () => {
    setLoaderModal(true);

    const url = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        setLoaderModal(false);

        setBuy(response?.data?.results?.IN?.buy);
        setFlatrate(response?.data?.results?.IN?.flatrate);
      })
      .catch((err) => {
        setLoaderModal(false);

        console.log(err?.message);
      });
  };

  const fetchRecommendations = () => {
    setLoaderModal(true);

    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;

    axios
      .get(url)
      .then((response) => {
        setLoaderModal(false);

        setRecommendations(response?.data?.results);
      })
      .catch((err) => {
        setLoaderModal(false);

        console.log(err.message);
      });
  };

  const addToHistory = () => {
    if (!auth?._id) {
      navigate("/sign-in");
    }
    const media = {
      type: "movie",
      id: movieData?.id,
      title: movieData?.title,
      poster_path: movieData?.poster_path,
      imdb_id: movieData?.imdb_id,
      runtime: movieData?.runtime,
    };
    dispatch(addToWatchlist(media));
  };

  const removeFromHistory = () => {
    dispatch(removeFromWatchlist(imdb?._id));
  };

  useEffect(() => {
    fetchMovieData();
    fetchCast();
    fetchWatchProviders();
    fetchRecommendations();
    // checkInWatchlist();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  return (
    <div>
      <div className="max-w-full md:h-1/2 ">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieData?.backdrop_path}`}
          alt="server-img"
          // className="object-fill w-full max-h-1/2"
          className="bg-auto w-full max-h-[400px]"
        />
      </div>
      <div className="flex space-x-5 px-2 z-50 -mt-12">
        <div className="max-w-[200px] md:w-4/12 sm:w-1/2">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieData?.poster_path}`}
            alt="server-img"
            className="shadow-2xl rounded-xl"
          />
        </div>

        <div>
          <p className="text-lg text-white stroke sm:text-4xl font-semibold">
            {movieData?.title}
            <span>({movieData?.release_date?.substring(0, 4)})</span>
          </p>

          <p className="text-sm opacity-80">{movieData?.tagline}</p>
          <p className="text-xs font-semibold">{movieData?.runtime} Mins.</p>

          {country?.map((item) => (
            <p key={item?.name}>{item?.name}</p>
          ))}
          {studio?.map((item) => (
            <p key={item?.name}>{item?.name}</p>
          ))}

          <p className="text-sm">
            {movieData?.status} on {movieData?.release_date}
          </p>

          <div className="flex space-x-2">
            {movieData?.genres?.map((item) => (
              <p key={item?.name} className="text-sm">
                {item?.name}
              </p>
            ))}
          </div>

          {/* Director & writers */}
          {directors?.map((item) => (
            <div onClick={() => navigate(`/person/${item?.id}`)} key={item?.id}>
              <p>{item?.name}</p>
            </div>
          ))}
          {writers?.map((item) => (
            <div onClick={() => navigate(`/person/${item?.id}`)} key={item?.id}>
              <p>
                {item?.name} <span>({item?.job})</span>
              </p>
            </div>
          ))}
          <p className="text-xs stroke text-white stroke-black">
            {movieData?.overview}
          </p>
        </div>
      </div>
      <p>ACTORS</p>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-10 mx-2 my-1">
        {cast?.map((item) => (
          <PersonCard
            key={item?.id}
            id={item?.id}
            name={item?.original_name}
            img={item?.profile_path}
            character={item?.character}
          />
        ))}
      </div>
      <div className="flex flex-col space-x-5 items-center">
        {new Date() >= new Date(movieData?.release_date) ? (
          <div
            className={imdb ? "bg-red-400" : "bg-blue-400"}
            onClick={imdb ? () => removeFromHistory() : () => addToHistory()}
          >
            {imdb ? "REMOVE FROM HISTORY" : "ADD TO HISTORY"}
          </div>
        ) : null}
        <div className="px-4 py-2 border rounded-full hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out cursor-pointer">
          ADD TO WATCHLIST
        </div>
      </div>
      {recommendations.length ? (
        <div>
          <p className="text-base my-1 px-2">
            If you like{" "}
            <span className="font-semibold">{movieData?.title}</span>, check
            out...
          </p>

          <div className="flex cursor-pointer overflow-x-scroll space-x-10 mx-2">
            {recommendations?.slice(0, 10)?.map((item) => (
              <MovieCard
                id={item?.id}
                img={item?.poster_path}
                name={item?.title}
                date={item?.release_date}
                runtime={item?.runtime}
                rating={item?.vote_average}
                genres={item?.genres}
                voteCount={item?.vote_count}
              />
            ))}
          </div>
        </div>
      ) : null}
      {buy || flatrate ? (
        <div className="flex space-x-5">
          {buy?.map((item) => (
            <img
              src={`https://image.tmdb.org/t/p/w500/${item?.logo_path}`}
              className="h-10"
              alt="server-img"
              key={item?.id}
            />
          ))}

          {flatrate?.map((item) => (
            <img
              src={`https://image.tmdb.org/t/p/w500/${item?.logo_path}`}
              alt="server-img"
              className="h-10"
              key={item?.id}
            />
          ))}
        </div>
      ) : (
        <p>No Watch Providers in India</p>
      )}
    </div>
  );
};

export default MovieInfo;
