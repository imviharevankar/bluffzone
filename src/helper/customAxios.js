import axios from "axios"

const configBody = {
  headers: {
    "x-access-token": localStorage.getItem("token"),
  },
};


export const getAxios = (url) => {
  return axios.get(url);
}