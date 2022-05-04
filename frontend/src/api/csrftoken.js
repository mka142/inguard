import { getCookie } from "./utils";
import axios from "axios";

export default {
  get: () => getCookie("csrftoken"),
  set: async () => {
    try {
      const response = await axios({
        url: "/api/auth/set_csrf/",
        method: "get",
        headers: { "X-CSRFToken": getCookie("csrftoken") },
      });
      return response;
    } catch (error) {
      return error;
    }
  },
};
