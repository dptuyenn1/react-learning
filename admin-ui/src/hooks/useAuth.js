import { AuthContext } from "@/store";
import { useContext } from "react";

function useAuth() {
  const [user, dispatch] = useContext(AuthContext);

  return [user, dispatch];
}

export default useAuth;
