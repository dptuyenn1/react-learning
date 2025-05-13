import axios, { authAPI } from "~/configs/axios";
import { END_POINTS } from "~/helpers/constants";

async function login(loginRequest) {
  const response = await axios.post(END_POINTS["login"], loginRequest);

  return response;
}

async function me() {
  const response = await authAPI().get(END_POINTS["me"]);

  return response;
}

export { login, me };
