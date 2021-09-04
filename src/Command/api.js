import api from "api";

export const command = async (message) => {
  return api.post("/", {
    type: "cmd",
    data: {
      message
    }
  });
};
