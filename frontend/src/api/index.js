import axios from "axios";
import csrftoken from "./csrftoken";

export const instance = axios.create({
  baseURL: `/api/`,
});

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      ...{ "X-CSRFToken": csrftoken.get() },
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      return new Promise((resolve, reject) => {
        const originalRequest = error.config;
        try {
          originalRequest._retry = true;

          resolve(
            csrftoken.set().then(() => {
              originalRequest.headers = {
                ...originalRequest.headers,
                ...{ "X-CSRFToken": csrftoken.get() },
              };
              return axios(originalRequest);
            })
          );
        } catch (e) {
          reject(e);
        }
      });
    } else {
      throw error;
    }
  }
);

export default instance;
