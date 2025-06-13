import axios from "~/configs/axios";
import { END_POINTS } from "~/helpers/constants";

async function hello() {
  const response = await axios.get(END_POINTS["hello"]);

  return response;
}

export { hello };
