import React from "react";
import Dashboard from "../components/Dashboard";
import UserHeader from "../components/UserHeader";
import { useData } from "../contexts/DataContext";
import History from "../components/History";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserInfo = () => {
  const { activeHead } = useData();
  const auth = useSelector((state) => state?.auth);

  return !auth?._id ? (
    <Navigate to="/sign-in" />
  ) : (
    <div>
      <UserHeader />
      {activeHead === "dashboard" ? <Dashboard /> : null}
      {activeHead === "history" ? <History /> : null}
      {activeHead === "watchlist" ? <h1>This is WatchList</h1> : null}
    </div>
  );
};

export default UserInfo;
