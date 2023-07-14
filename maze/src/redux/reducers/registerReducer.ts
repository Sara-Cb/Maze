import {
  RegisterActionType,
  RegisterAction,
  RegisterState,
} from "../../types/registerType";

const initialState: RegisterState = {
  registered: false,
  loading: false,
  error: null,
};

const registerReducer = (
  state = initialState,
  action: RegisterAction
): RegisterState => {
  switch (action.type) {
    case RegisterActionType.REGISTER_REQUEST:
      return {
        ...state,
        registered: false,
        loading: true,
        error: null,
      };
    case RegisterActionType.REGISTER_SUCCESS:
      return {
        ...state,
        registered: true,
        loading: false,
        error: null,
      };
    case RegisterActionType.REGISTER_FAILURE:
      return {
        ...state,
        registered: false,
        loading: false,
        error: action.error,
      };
    case RegisterActionType.REGISTER_RESET:
      return {
        ...state,
        registered: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default registerReducer;
