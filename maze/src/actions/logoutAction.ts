import { LogoutActionType, LogoutAction } from "../types/logoutType";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

const getLogoutRequest = (): LogoutAction => ({
  type: LogoutActionType.LOGOUT_REQUEST,
  loading: true,
  error: null,
});

const getLogoutSuccess = (): LogoutAction => ({
  type: LogoutActionType.LOGOUT_SUCCESS,
  loading: false,
  error: null,
});

const getLogoutFailure = (error: string): LogoutAction => ({
  type: LogoutActionType.LOGOUT_FAILURE,
  loading: false,
  error: error,
});

const logoutFetch = (username: string, password: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getLogoutRequest());
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        dispatch(getLogoutSuccess());
      } else {
        throw new Error("Failed to logout");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(getLogoutFailure(error.message));
      } else {
        dispatch(getLogoutFailure("An unknown error occurred during logout."));
      }
    }
  };
};

export default logoutFetch;
