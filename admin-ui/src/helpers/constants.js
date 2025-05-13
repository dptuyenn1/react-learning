const BASE_URL = "http://localhost:8080";
const API_PREFIX = "/api/v1";

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

const ROLES = [
  { value: "ROLE_USER", label: "USER" },
  { value: "ROLE_ADMIN", label: "ADMIN" },
  { value: "ROLE_SUPER_ADMIN", label: "SUPER_ADMIN" },
];

export { AUTH_REDUCER_TYPES, BASE_URL, END_POINTS, ROLES };
