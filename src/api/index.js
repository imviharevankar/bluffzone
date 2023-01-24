export const BASE_URL = "http://localhost:8800";

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
