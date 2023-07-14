import { LogoutAction, LogoutActionType } from "../../types/logoutType";

const initialState = {
  loading: false,
  error: null,
};

const logoutReducer = (state = initialState, action: LogoutAction) => {
  switch (action.type) {
    case LogoutActionType.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LogoutActionType.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case LogoutActionType.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default logoutReducer;
