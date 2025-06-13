import axios from "axios";
import { BASE_URL } from "~/helpers/constants";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
