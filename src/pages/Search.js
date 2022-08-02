import React from "react";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";
import { Pagination } from "@mui/material";
import { useData } from "../contexts/DataContext";
import { useModal } from "../contexts/ModalContext";

const Search = () => {
  const { data, setPage } = useData();
  const { openSearch } = useModal();

  const changePage = (e) => {
    localStorage.setItem("page", e?.target?.textContent);
    setPage(localStorage.getItem("page"));
    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   changePage();
  // }, [page]);

  return (
    <div>
      <SearchBar />
      <SearchResult />
      <div className="flex items-center justify-center my-5">
        <Pagination
          shape="rounded"
          variant="outlined"
          onClick={(e) => changePage(e)}
          count={data?.total_pages}
        />
      </div>
    </div>
  );
};

export default Search;
