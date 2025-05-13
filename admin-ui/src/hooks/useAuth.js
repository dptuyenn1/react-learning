import { useContext } from "react";
import { AuthContext } from "~/store";

function useAuth() {
  const [user, dispatch] = useContext(AuthContext);

  return [user, dispatch];
}

export default useAuth;
