export enum LogoutActionType {
  LOGOUT_REQUEST = "LOGOUT_REQUEST",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_FAILURE = "LOGOUT_FAILURE",
  RESET_STORE = "RESET_STORE",
}

export type LogoutAction =
  | {
      type: typeof LogoutActionType.LOGOUT_REQUEST;
      loading: boolean;
      error: string | null;
    }
  | {
      type: typeof LogoutActionType.LOGOUT_SUCCESS;
      loading: boolean;
      error: null;
    }
  | {
      type: typeof LogoutActionType.LOGOUT_FAILURE;
      loading: boolean;
      error: string;
    }
  | {
      type: typeof LogoutActionType.RESET_STORE;
    };

export interface LogoutState {
  loading: boolean;
  error?: string | null;
}
