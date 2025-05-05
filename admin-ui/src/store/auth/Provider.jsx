import { useReducer } from "react";
import Context from "./Context";
import reducer from "./reducer";

function Provider({ children }) {
  const [user, dispatch] = useReducer(reducer, localStorage.getItem("user"));

  return (
    <Context.Provider value={[user, dispatch]}>{children}</Context.Provider>
  );
}

export default Provider;
