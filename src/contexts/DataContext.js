import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [query, setQuery] = useState(localStorage.getItem("query") || "");
  const [type, setType] = useState(localStorage.getItem("type") || "multi");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [activeHead, setActiveHead] = useState("dashboard");

  const [watchHistory, setWatchHistory] = useState([]);
  const [data, setData] = useState([]);

  const value = {
    query,
    type,
    data,
    page,
    loading,
    isLogged,
    activeHead,
    watchHistory,
    setPage,
    setType,
    setQuery,
    setLoading,
    setData,
    setIsLogged,
    setActiveHead,
    setWatchHistory,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
