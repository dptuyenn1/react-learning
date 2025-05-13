import { AUTH_REDUCER_TYPES } from "~/helpers/constants";

function reducer(state, action) {
  switch (action.type) {
    case AUTH_REDUCER_TYPES["login"]:
      return action.payload;
    case AUTH_REDUCER_TYPES["logout"]:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      return null;
    default:
      return state;
  }
}

export default reducer;
