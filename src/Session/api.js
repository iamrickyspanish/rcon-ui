import api from "api";

export const create = async ({ host, port, password, game }) => {
  try {
    return await api.post("/", {
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
  } catch (err) {
    return err;
  }
};

window.create = create;
