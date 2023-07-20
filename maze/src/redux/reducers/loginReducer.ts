import {
  LoginActionType,
  LoginAction,
  LoginState,
} from "../../types/loginType";

const initialState: LoginState = {
  session: {
    username: "",
    accessToken: "",
    tokenType: "",
  },
  loggedIn: false,
  loading: false,
  error: null,
};

const loginReducer = (
  state: LoginState = initialState,
  action: LoginAction
): LoginState => {
  switch (action.type) {
    case LoginActionType.LOGIN_REQUEST:
    case LoginActionType.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LoginActionType.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        error: null,
        session: action.payload,
      };
    case LoginActionType.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        loading: false,
        error: action.payload || "Wrong username or password.",
      };
    case LoginActionType.LOGOUT_SUCCESS:
      return {
        session: null,
        loggedIn: false,
        loading: false,
        error: null,
      };
    case LoginActionType.LOGOUT_FAILURE:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        error: "Something went wrong",
      };
    default:
      return state;
  }
};

export default loginReducer;
