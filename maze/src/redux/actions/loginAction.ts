import { LoginActionType, LoginAction, Session } from "../../types/loginType";
import { Dispatch } from "redux";
import { RootState } from "../store/store";
import { getMe } from "./meAction";

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

const loginFetch = (username: string, password: string): any => {
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
        //console.log(data);
      })
      .catch((error) => {
        dispatch(getLoginFailure(error.message));
      });
  };
};

export default loginFetch;
