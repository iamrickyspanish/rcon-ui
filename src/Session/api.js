import api from "api";

export const create = async ({ host, port, password, game }) => {
  return api.post("/", {
    type: "start",
    data: {
      game,
      credentials: {
        host,
        port,
        password
      }
    }
  });
};
