import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    "Access-Control-Allow-Origin": "*",
  },
});

// if (token) {
//   instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }
// instance.defaults.withCredentials = true;

export { instance };
