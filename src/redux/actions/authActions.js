import { SIGN_UP, SIGN_IN, SIGN_OUT, USER_LOADED } from "./types";
import axios from "axios";
import { BASE_URL } from "../../api";

export const signup = (user) => {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}/api/auth/signup`, user)
      .then((response) => {
        localStorage.setItem("token", response?.data?.token);
        dispatch({
          type: SIGN_UP,
          token: response?.data?.token,
        });
      })
      .catch((error) => console.log(error?.data?.message));
  };
};

export const signin = (user) => {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}/api/auth/signin`, user)
      .then((response) => {
        localStorage.setItem("token", response?.data?.token);
        dispatch({
          type: SIGN_IN,
          token: response?.data?.token,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const signout = () => {
  return (dispatch) => {
    dispatch({
      type: SIGN_OUT,
    });
  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token) {
      dispatch({
        type: USER_LOADED,
        token,
      });
    } else return null;
  };
};
