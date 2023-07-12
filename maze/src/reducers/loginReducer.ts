import { LoginActionType, LoginAction, LoginState } from "../types/loginType";

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
    default:
      return state;
  }
};

export default loginReducer;
