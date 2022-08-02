import { toast } from "react-toastify";
import {
  ADD_TO_WATCHLIST,
  FETCH_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
} from "../actions/types";

const initialState = [];

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WATCHLIST:
      return action.response?.data;
    case ADD_TO_WATCHLIST:
      toast.success(`Watched`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
      return [...state, action?.response?.data];

    case REMOVE_FROM_WATCHLIST:
      console.log(action.response?.data?.id);
      toast.error(`Removed`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
      return state.filter(
        (watchlist) => watchlist._id !== action.response?.data?.id
      );

    default:
      return state;
  }
};

export default watchlistReducer;
