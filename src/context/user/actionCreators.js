import * as ac from "./actionConstants";

export const loginUserReq = () => ({
  type: ac.LOGIN_USER_REQ,
});

export const loginUserSuccess = (username, id) => ({
  type: ac.LOGIN_USER_SUCCESS,
  payload: {
    username,
    id,
  },
});

export const loginUserFail = (err) => ({
  type: ac.LOGIN_USER_FAIL,
  payload: {
    err,
  },
});

export const logoutUser = () => ({
  type: ac.LOGOUT_USER,
});
