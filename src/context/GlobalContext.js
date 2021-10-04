import { useReducer, createContext } from "react";

import userReducer, { initState } from "./user/userReducer";

export const UserAuthCtx = createContext(initState);

const GlobalContext = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initState);

  return (
    <UserAuthCtx.Provider
      value={{
        userState: state,
        userDispatch: dispatch,
      }}
    >
      {children}
    </UserAuthCtx.Provider>
  );
};

export default GlobalContext;
