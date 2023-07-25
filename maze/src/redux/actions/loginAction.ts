import { LoginActionType, LoginAction, Session } from "../../types/loginType";
import { RootState } from "../store/store";
import { getMe } from "./creativeAction";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

const getLoginRequest = (): LoginAction => ({
  type: LoginActionType.LOGIN_REQUEST,
  loading: true,
  error: null,
});

const getLoginSuccess = (payload: Session): LoginAction => ({
  type: LoginActionType.LOGIN_SUCCESS,
  payload: payload,
  loading: false,
  error: null,
});

const getLoginFailure = (error: string): LoginAction => ({
  type: LoginActionType.LOGIN_FAILURE,
  loading: false,
  error: error,
});

const getLogoutRequest = (): LoginAction => ({
  type: LoginActionType.LOGOUT_REQUEST,
  loading: true,
  error: null,
});

const getLogoutSuccess = (): LoginAction => ({
  type: LoginActionType.LOGOUT_SUCCESS,
  loading: false,
  error: null,
});

const getLogoutFailure = (error: string): LoginAction => ({
  type: LoginActionType.LOGOUT_FAILURE,
  loading: false,
  error: error,
});

export const loginFetch = (username: string, password: string): any => {
  return (dispatch: Dispatch<LoginAction>, getState: () => RootState) => {
    dispatch(getLoginRequest());
    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to login");
        }
      })
      .then((data) => {
        dispatch(getLoginSuccess(data));
        getMe(data.username);
      })
      .catch((error) => {
        dispatch(getLoginFailure(error.message));
      });
  };
};

export const logoutFetch = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getLogoutRequest());
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
