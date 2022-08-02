import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import MovieIcon from "@material-ui/icons/Movie";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { useData } from "../contexts/DataContext";
import { signout } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeHead, setActiveHead } = useData();
  const logOutUser = () => {
    dispatch(signout());
    navigate("/");
    setActiveHead("dashboard");
  };
  return (
    <div className="flex items-center">
      <ul className="flex space-x-5 overflow-x-scroll scrollbar-hide mx-auto mt-2">
        <li
          className={
            activeHead === "dashboard"
              ? "action__btn space-x-2 text-red-400"
              : "action__btn space-x-2"
          }
          onClick={() => setActiveHead("dashboard")}
        >
          <DashboardIcon />
          <span>Dashboard</span>
        </li>
        <li
          className={
            activeHead === "history"
              ? "action__btn space-x-2 text-red-400"
              : "action__btn space-x-2"
          }
          onClick={() => setActiveHead("history")}
        >
          <MovieIcon />
          <span>History</span>
        </li>
        <li
          className={
            activeHead === "watchlist"
              ? "action__btn space-x-2 text-red-400"
              : "action__btn space-x-2"
          }
          onClick={() => setActiveHead("watchlist")}
        >
          <PlaylistAddIcon />
          <span>Watchlist</span>
        </li>
        <li className="action__btn space-x-2" onClick={() => logOutUser()}>
          <LogoutIcon />
          <span>Log Out</span>
        </li>
      </ul>
    </div>
  );
};

export default UserHeader;
