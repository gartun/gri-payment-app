import * as ac from "./actionConstants";

export const initState = {
  isInLoginProcess: false,
  isLogin: false,
  error: "",
  username: "",
  id: -1,
};

const userReducer = (state = initState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ac.LOGIN_USER_REQ:
      return {
        ...state,
        isInLoginProcess: true,
      };
    case ac.LOGIN_USER_SUCCESS:
      return {
        isInLoginProcess: false,
        isLogin: true,
        username: payload.username,
        id: payload.id,
      };
    case ac.LOGIN_USER_FAIL:
      return {
        ...state,
        error: payload.err,
        isInLoginProcess: false,
      };
    case ac.LOGOUT_USER:
      return {
        ...state,
        username: "",
        id: -1,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default userReducer;
