import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_PROXY,
  withCredentials: true
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json;charset=utf-8"
  // }
});

// api.defaults.withCredentials = true;

export default api;
