export enum LoginActionType {
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
}

export interface Session {
  username: string;
  accessToken: string;
  tokenType: string;
}

export interface LoginAction {
  type: LoginActionType;
  payload?: any;
  loading: boolean;
  error?: string | null;
}

export interface LoginState {
  session: Session;
  loggedIn: boolean;
  loading: boolean;
  error?: string | null;
}
