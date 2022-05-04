import axios from "axios";
import csrftoken from "./csrftoken";

export const instance = axios.create({
  baseURL: `/api/`,
  headers: { "X-CSRFToken": csrftoken.get() },
});

export default instance;
