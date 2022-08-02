import axios from "axios";
import { setHeaders, url } from "../../api";
import {
  ADD_TO_WATCHLIST,
  FETCH_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
} from "./types";

export const fetchWatchlist = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8800/api/history`, setHeaders())
      .then((response) => {
        console.log(response);
        dispatch({
          type: FETCH_WATCHLIST,
          response,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const addToWatchlist = (media) => {
  return (dispatch, getState) => {
    const id = getState().auth?._id;
    axios
      .post(
        `http://localhost:8800/api/history`,
        {
          user_id: id,
          media,
        },
        setHeaders()
      )
      .then((response) => {
        dispatch({
          type: ADD_TO_WATCHLIST,
          response,
        });
      })
      .catch((error) => console.log(error?.data?.message));
  };
};

export const removeFromWatchlist = (id) => {
  console.log(id);
  return (dispatch) => {
    axios
      .delete(`http://localhost:8800/api/history/${id}`, setHeaders())
      .then((response) => {
        console.log(response);
        dispatch({
          type: REMOVE_FROM_WATCHLIST,
          response,
        });
      })
      .catch((error) => console.log(error?.data?.message));
  };
};
