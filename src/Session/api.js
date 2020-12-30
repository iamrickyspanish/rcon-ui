import axios from "axios";
// window.axios = axios;
export const create = async ({ host, port, password, game }) => {
  try {
    return await axios.post(
      "https://panel.frag.world/api/",
      {
        host,
        port,
        password,
        game
      },
      {
        withCredentials: true
      }
    );
  } catch (err) {
    return err;
  }
};
