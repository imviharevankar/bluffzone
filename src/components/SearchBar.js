import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";

const SearchBar = () => {
  const { query, setQuery, type, setType, setData, page, setPage } = useData();
  const navigate = useNavigate();
  const API_KEY = "e547e17d4e91f3e62a571655cd1ccaff";
  const queryLS = localStorage.getItem("query");
  const typeLS = localStorage.getItem("type");

  const url = `https://api.themoviedb.org/3/search/${typeLS}?api_key=${API_KEY}&language=en-US&page=${page}&query=${queryLS}&include_adult=false`;

  const getResults = (e) => {
    e.preventDefault();
    if (query.length !== "") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          navigate(`/search/${type}/query=${query}`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    localStorage.setItem("query", query);
    localStorage.setItem("type", type);
    // localStorage.setItem("page", page);
  }, [query, type, page]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (query.length !== "") {
      axios
        .get(url)
        .then((response) => {
          setData(response?.data);
        })
        .catch((err) => {
          console.log(err?.message);
        });
    }
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="border-2  border-blue-600">
      <form className="flex w-5/5 items-center">
        <input
          className="outline-none w-3/5"
          valeu={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          type="text"
          placeholder={query || "Search for movies..."}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="multi">Movies & Shows</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
          <option value="person">People</option>
        </select>
        <button type="submit" onClick={getResults}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
