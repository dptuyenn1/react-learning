import { authAPI } from "@/configs/axios";
import { END_POINTS } from "@/helpers/constants";

async function hello() {
  const response = await authAPI().get(END_POINTS["hello"]);

  return response;
}

export { hello };
