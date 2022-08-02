import axios from "axios";
import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { useNavigate, useParams } from "react-router-dom";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-ui/core";
import defaultPoster from "../assets/images/blank-poster.jpg";
import { useModal } from "../contexts/ModalContext";

const PersonInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const [personData, setPersonData] = useState([]);
  const [socials, setSocials] = useState([]);
  const [credit, setCredit] = useState([]);
  const [birthDate, setBirthDate] = useState(personData?.birthday);
  const fetchAge = () => {
    const today = new Date();
    const birthDate = new Date(personData?.birthday);
    let a = today.getFullYear() - birthDate?.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      a--;
    }
    return a;
  };
  const age = fetchAge();

  const API_KEY = "e547e17d4e91f3e62a571655cd1ccaff";
  const { setLoaderModal } = useModal();

  const fetchPersonDetials = () => {
    setLoaderModal(true);

    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`;

    axios
      .get(url)
      .then((response) => {
        setLoaderModal(false);
        setPersonData(response?.data);
        setBirthDate(new Date(response?.data?.birthday));
        console.log(response?.data);
      })
      .catch((err) => {
        setLoaderModal(false);
        console.log(err.message);
      });
  };

  const fetchCredits = (type = "combined") => {
    setLoaderModal(true);

    const url = `https://api.themoviedb.org/3/person/${id}/${type}_credits?api_key=${API_KEY}&language=en-US&include_adult=false`;

    axios
      .get(url)
      .then((response) => {
        setLoaderModal(false);
        setCredit(
          response?.data?.cast?.sort(
            (a, b) =>
              new Date(b?.first_air_date || b?.release_date) -
              new Date(a?.first_air_date || a?.release_date)
          )
        );
      })
      .catch((err) => {
        console.log(err.message);
        setLoaderModal(false);
      });
  };

  const fetchSocialMedia = () => {
    setLoaderModal(true);

    const url = `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${API_KEY}&language=en-US`;

    axios
      .get(url)
      .then((response) => {
        setLoaderModal(false);
        setSocials(response.data);
      })
      .catch((err) => {
        setLoaderModal(false);
        console.log(err.message);
      });
  };

  const navigateCredit = (type, cID) => {
    if (type === "movie" || active === "movie") {
      navigate(`/movie/${cID}`);
    } else if (type === "tv" || active === "tv") {
      navigate(`/tv/${cID}`);
    } else return null;
  };

  useEffect(() => {
    fetchPersonDetials();
    fetchSocialMedia();
    fetchCredits();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mx-2 my-2">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <div className="max-w-[200px] md:w-1/4 w-1/3 my-1 mx-2">
            <img
              src={`https://image.tmdb.org/t/p/w500/${personData?.profile_path}`}
              className="shadow-lg rounded aspect-video  align-middle border-none"
              alt="server-img"
            />
          </div>

          <div>
            <p className="sm:text-2xl xsm:text-lg my-1">{personData?.name}</p>
            {personData?.known_for_department === "Acting" ? (
              <p className="text-md">Actor</p>
            ) : null}

            <p className="text-lg">
              <span>Age:</span> {age}
            </p>
            <p className="text-lg">
              <span>Born:</span>{" "}
              <span>{new Intl.DateTimeFormat("en-IN").format(birthDate)}</span>
              {" at "}
              <span>{personData?.place_of_birth}</span>
            </p>
            <p className="text-xs xsm:text-[8px] hover:scale-105">
              {personData?.biography}
            </p>
          </div>
        </div>

        <div className="flex  flex-col items-center">
          {socials?.facebook_id ? (
            <IconButton>
              <a
                href={`https://facebook.com/${socials?.facebook_id}`}
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon
                  style={{ fontSize: "1.5rem" }}
                  className="text-blue-600"
                />
              </a>
            </IconButton>
          ) : null}

          {socials?.instagram_id ? (
            <IconButton>
              <a
                href={`https://instagram.com/${socials?.instagram_id}`}
                target="_blank"
                rel="noreferrer"
                className="text-red-400"
              >
                <InstagramIcon style={{ fontSize: "1.5rem" }} />
              </a>
            </IconButton>
          ) : null}

          {socials?.imdb_id ? (
            <IconButton>
              <a
                href={`https://imdb.com/name/${socials?.imdb_id}`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  style={{ fontSize: "1.5rem" }}
                  icon={faImdb}
                  color="#f3ce13"
                />
              </a>
            </IconButton>
          ) : null}

          {socials?.twitter_id ? (
            <IconButton>
              <a
                href={`https://twitter.com/${socials?.twitter_id}`}
                target="_blank"
                rel="noreferrer"
              >
                <TwitterIcon
                  style={{ fontSize: "1.5rem" }}
                  className="text-blue-500"
                />
              </a>
            </IconButton>
          ) : null}
        </div>
      </div>

      <div className="bg-red-200 rounded-xl border border-black">
        <p className="text-2xl text-indigo-800">Credits</p>
        <div className="flex overflow-x-scroll scrollbar-hide my-2">
          <button
            className={
              active === ``
                ? "py-2 px-5 border border-pink-400 rounded-sm bg-white"
                : "py-2 px-5 border rounded-sm bg-white"
            }
            onClick={() => {
              setActive("");
              fetchCredits();
            }}
          >
            All {active === `` ? ` (${credit?.length})` : null}
          </button>
          <button
            onClick={() => {
              fetchCredits("movie");
              setActive("movie");
            }}
            className={
              active === `movie`
                ? "py-2 px-5 border border-pink-400 rounded-sm bg-white"
                : "py-2 px-5 border rounded-sm bg-white"
            }
          >
            Movies{active === `movie` ? ` (${credit?.length})` : null}
          </button>
          <button
            className={
              active === `tv`
                ? "py-2 px-5 border border-pink-400 rounded-sm bg-white"
                : "py-2 px-5 border rounded-sm bg-white"
            }
            onClick={() => {
              fetchCredits("tv");
              setActive("tv");
            }}
          >
            TV Shows {active === `tv` ? ` (${credit?.length})` : null}
          </button>
        </div>

        <select placeholder="Sort">
          <option>Released</option>
          <option>Title</option>
        </select>

        <div className="flex mx-auto justify-center sm:justify-start flex-wrap scrollbar-hide">
          {credit?.map((item) => (
            <div
              onClick={() => navigateCredit(item?.media_type, item?.id)}
              className="border-2 border-gray-200 shadow-lg mx-2 my-2 max-w-[120px]"
            >
              <div className="w-[120px]">
                <img
                  src={
                    item?.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${item?.poster_path}`
                      : defaultPoster
                  }
                  className="shadow-xl rounded max-w-full h-auto align-middle border-none"
                  alt="poster"
                />
              </div>
              <p className="text-sm text-center">{item?.name || item?.title}</p>
              <p className="text-xs text-center">{item?.character}</p>

              <p className="text-sm text-center">
                {(item?.first_air_date || item?.release_date)?.substring(0, 4)}
                {item?.episode_count ? (
                  <span> - {item?.episode_count} episodes</span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonInfo;
