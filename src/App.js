import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./contexts/DataContext";
import Home from "./pages/Home";
import MovieInfo from "./pages/MovieInfo";
import SeriesInfo from "./pages/SeriesInfo";
import SeasonInfo from "./pages/SeasonInfo";
import PersonInfo from "./pages/PersonInfo";

import Search from "./pages/Search";
import EpisodeInfo from "./pages/EpisodeInfo";
import Header from "./components/Header";
import { useModal } from "./contexts/ModalContext";
import SearchBar from "./components/SearchBar";
import "font-awesome/css/font-awesome.min.css"; //import in react app
import "react-loading-skeleton/dist/skeleton.css";
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserInfo from "./pages/UserInfo";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/authActions";
import PageNotFound from "./pages/PageNotFound";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LoaderModal from "./components/LoaderModal";

function App() {
  const { openSearch } = useModal();

  const dispatch = useDispatch();
  const { loaderModal } = useModal();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <DataProvider>
        <Header />
        {openSearch ? <SearchBar /> : null}
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user" element={<UserInfo />} />
          <Route path="/person/:id" element={<PersonInfo />} />
          <Route
            path="/tv/:id/season/:num/episode/:epi_num"
            element={<EpisodeInfo />}
          />

          <Route path="/tv/:id/season/:num" element={<SeasonInfo />} />

          <Route path="/tv/:id" element={<SeriesInfo />} />

          <Route path="/movie/:id" element={<MovieInfo />} />

          <Route path="/search/:type/query=:query" element={<Search />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </DataProvider>
      {loaderModal ? <LoaderModal /> : null}
    </Router>
  );
}

export default App;
// https://api.themoviedb.org/3/movie/157336?api_key=e547e17d4e91f3e62a571655cd1ccaff

// 71728
