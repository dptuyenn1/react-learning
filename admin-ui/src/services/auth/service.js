import axios from "~/configs/axios";
import { END_POINTS } from "~/helpers/constants";

async function login(request) {
  const response = await axios.post(END_POINTS["login"], request);

  return response;
}

async function me() {
  const response = await axios.get(END_POINTS["me"]);

  return response;
}

async function register(request) {
  const response = await axios.post(END_POINTS["register"], request);

  return response;
}

export { login, me, register };
