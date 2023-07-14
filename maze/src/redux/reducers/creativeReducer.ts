import {
  CreativeActionType,
  CreativeAction,
  CreativeState,
} from "../../types/creativeType";

const initialState: CreativeState = {
  creative: {
    id: 0,
    username: "",
    email: "",
    password: "",
    registrationDate: "",
    roles: [],
    firstname: "",
    lastname: "",
    stageName: "",
    bio: "",
    city: "",
    state: "",
    image: "",
    skills: [],
    professions: [],
    portfolio: 0,
  },
  loading: false,
  error: null,
};

const creativeReducer = (
  state: CreativeState = initialState,
  action: CreativeAction
): CreativeState => {
  switch (action.type) {
    case CreativeActionType.GET_CREATIVE_REQUEST:
    case CreativeActionType.UPDATE_CREATIVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CreativeActionType.GET_CREATIVE_SUCCESS:
    case CreativeActionType.UPDATE_CREATIVE_SUCCESS:
      return {
        ...state,
        creative: action.payload,
        loading: false,
        error: null,
      };
    case CreativeActionType.GET_CREATIVE_FAILURE:
    case CreativeActionType.UPDATE_CREATIVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default creativeReducer;
