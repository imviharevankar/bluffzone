import jwtDecode from "jwt-decode";
import { SIGN_IN, SIGN_OUT, SIGN_UP, USER_LOADED } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  username: null,
  email: null,
  _id: null,
  createdAt: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_UP:
    case USER_LOADED:
      const user = jwtDecode(action.token);
      return {
        ...state,
        token: action.token,
        username: user.username,
        email: user.email,
        _id: user._id,
        createdAt: user.createdAt,
      };

    case SIGN_OUT:
      localStorage.removeItem("token");
      return {
        token: null,
        username: null,
        email: null,
        _id: null,
        createdAt: null,
      };

    default:
      return state;
  }
};

export default authReducer;
