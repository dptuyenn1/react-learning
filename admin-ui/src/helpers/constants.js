const BASE_URL = "http://localhost:8080";
const API_PREFIX = "/api";

const END_POINTS = {
  login: `${API_PREFIX}/auth/login`,
  me: `${API_PREFIX}/auth/me`,
  register: `${API_PREFIX}/auth/register`,
};

const AUTH_REDUCER_TYPES = {
  login: "TYPE_LOGIN",
  logout: "TYPE_LOGOUT",
};

export { BASE_URL, END_POINTS, AUTH_REDUCER_TYPES };
