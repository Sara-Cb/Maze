import {
  ElaborateActionType,
  ElaborateAction,
  ElaborateState,
} from "../types/elaborateType";

const initialState: ElaborateState = {
  elaborate: {
    id: 0,
    author: "",
    createdAt: "",
    collection: 0,
    file: "",
    title: "",
    updatedAt: "",
    description: "",
  },
  loading: false,
  error: null,
};

const elaborateReducer = (
  state = initialState,
  action: ElaborateAction
): ElaborateState => {
  switch (action.type) {
    case ElaborateActionType.GET_ELABORATE_REQUEST:
    case ElaborateActionType.POST_ELABORATE_REQUEST:
    case ElaborateActionType.UPDATE_ELABORATE_REQUEST:
    case ElaborateActionType.DELETE_ELABORATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ElaborateActionType.GET_ELABORATE_SUCCESS:
    case ElaborateActionType.POST_ELABORATE_SUCCESS:
    case ElaborateActionType.UPDATE_ELABORATE_SUCCESS:
      return {
        ...state,
        elaborate: action.payload,
        loading: false,
        error: null,
      };
    case ElaborateActionType.DELETE_ELABORATE_SUCCESS:
      return {
        elaborate: state.elaborate,
        loading: false,
        error: null,
      };
    case ElaborateActionType.GET_ELABORATE_FAILURE:
    case ElaborateActionType.POST_ELABORATE_FAILURE:
    case ElaborateActionType.UPDATE_ELABORATE_FAILURE:
    case ElaborateActionType.DELETE_ELABORATE_FAILURE:
      return {
        ...state,
        loading: false,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        error: action.error!,
      };
    default:
      return state;
  }
};

export default elaborateReducer;
