import axios from "axios";
import { BASE_URL } from "~/helpers/constants";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function authAPI() {
  const accessToken = localStorage.getItem("accessToken");

  instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return instance;
}

export default instance;
export { authAPI };
