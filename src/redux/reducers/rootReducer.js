import { combineReducers } from "redux";
import { searchDataReducer } from "./searchDataReducer";
import authReducer from "./authReducer";
import watchlistReducer from "./watchlistReducer";

// import { errorReducer } from "./errorReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  watchlist: watchlistReducer,
  // error: errorReducer,
  searchResult: searchDataReducer,
});

export default rootReducer;
