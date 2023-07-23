import {
  CreativeActionType,
  CreativeAction,
  CreativeState,
} from "../../types/creativeType";

const initialState: CreativeState = {
  me: {
    c: {
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
  },
  selected: {
    c: {
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
  },
};

export const creativeReducer = (
  state: CreativeState = initialState,
  action: CreativeAction
): CreativeState => {
  switch (action.type) {
    case CreativeActionType.GET_CREATIVE_REQUEST:
      return {
        ...state,
        selected: {
          c: undefined,
          loading: true,
          error: null,
        },
      };
    case CreativeActionType.GET_CREATIVE_SUCCESS:
      return {
        ...state,
        selected: {
          c: action.payload,
          loading: false,
          error: null,
        },
      };
    case CreativeActionType.GET_CREATIVE_FAILURE:
      return {
        ...state,
        selected: {
          c: action.payload,
          loading: false,
          error: action.payload,
        },
      };
    case CreativeActionType.GET_ME_REQUEST:
      return {
        ...state,
        me: {
          c: undefined,
          loading: true,
          error: null,
        },
      };
    case CreativeActionType.GET_ME_SUCCESS:
      return {
        ...state,
        me: {
          c: action.payload,
          loading: false,
          error: null,
        },
      };
    case CreativeActionType.GET_ME_FAILURE:
      return {
        ...state,
        me: {
          c: action.payload,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default creativeReducer;
