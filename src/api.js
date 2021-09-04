import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_PROXY,
  withCredentials: true
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json;charset=utf-8"
  // }
});

api.interceptors.response.use(response => response, error => {
  console.log(error)
  return Promise.reject(error);
})
// api.defaults.withCredentials = true;

export default api;
