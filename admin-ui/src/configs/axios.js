import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

const accessToken = Cookies.get("accessToken");

instance.interceptors.response.use(function (response) {
  return response.data;
});

function authAPI() {
  instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return instance;
}

export default instance;
export { authAPI };
