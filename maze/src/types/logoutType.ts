export enum LogoutActionType {
  LOGOUT_REQUEST = "LOGOUT_REQUEST",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_FAILURE = "LOGOUT_FAILURE",
}

export interface LogoutAction {
  type: LogoutActionType;
  loading: boolean;
  error?: string | null;
}

export interface LogoutState {
  loading: boolean;
  error?: string | null;
}
