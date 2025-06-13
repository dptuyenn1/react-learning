const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_PREFIX = import.meta.env.VITE_API_PREFIX;

const END_POINTS = {
  login: `${API_PREFIX}/auth/login`,
  me: `${API_PREFIX}/auth/me`,
  register: `${API_PREFIX}/auth/register`,
  hello: `${API_PREFIX}/mock/hello`,
};

const AUTH_REDUCER_TYPES = {
  login: "TYPE_LOGIN",
  logout: "TYPE_LOGOUT",
};

export { AUTH_REDUCER_TYPES, BASE_URL, END_POINTS };
