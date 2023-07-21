export enum RegisterActionType {
  REGISTER_REQUEST = "REGISTER_REQUEST",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAILURE = "REGISTER_FAILURE",
  REGISTER_RESET = "REGISTER_RESET",
}

export interface RegisterAction {
  type: RegisterActionType;
  payload?: any;
  loading: boolean;
  error?: string | null;
}

export interface RegisterState {
  registered: boolean;
  loading: boolean;
  error?: string | null;
}
