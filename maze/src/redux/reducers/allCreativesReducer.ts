import {
  CreativeActionType,
  CreativeAction,
  AllCreativesState,
} from "../../types/creativeType";

const initialState: AllCreativesState = {
  c: [],
  loading: false,
  error: null,
};

export const allCreativesReducer = (
  state: AllCreativesState = initialState,
  action: CreativeAction
): AllCreativesState => {
  switch (action.type) {
    case CreativeActionType.GET_ALL_CREATIVES_REQUEST:
      return {
        ...state,
        c: [],
        loading: true,
        error: null,
      };
    case CreativeActionType.GET_ALL_CREATIVES_SUCCESS:
      return {
        ...state,
        c: action.payload,
        loading: false,
        error: null,
      };
    case CreativeActionType.GET_ALL_CREATIVES_FAILURE:
      return {
        ...state,
        c: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default allCreativesReducer;
