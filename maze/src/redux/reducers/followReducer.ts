import {
  FollowAction,
  FollowActionType,
  FollowState,
} from "../../types/followType";

const initialState: FollowState = {
  myFollowList: [],
  isProfileFollowed: false,
  toggleStatus: "",
  loading: false,
  error: null,
};

export const followReducer = (
  state: FollowState = initialState,
  action: FollowAction
): FollowState => {
  switch (action.type) {
    case FollowActionType.GET_MY_FOLLOWED_REQUEST:
      return {
        ...state,
        myFollowList: [],
        loading: true,
        error: null,
      };
    case FollowActionType.GET_MY_FOLLOWED_SUCCESS:
      return {
        ...state,
        myFollowList: action.payload,
        loading: false,
        error: null,
      };
    case FollowActionType.GET_MY_FOLLOWED_FAILURE:
      return {
        ...state,
        myFollowList: [],
        loading: false,
        error: action.payload,
      };
    case FollowActionType.IS_PROFILE_FOLLOWED_REQUEST:
      return {
        ...state,
        isProfileFollowed: false,
        loading: true,
        error: null,
      };
    case FollowActionType.IS_PROFILE_FOLLOWED_SUCCESS:
      return {
        ...state,
        isProfileFollowed: action.payload,
        loading: false,
        error: null,
      };
    case FollowActionType.IS_PROFILE_FOLLOWED_FAILURE:
      return {
        ...state,
        isProfileFollowed: false,
        loading: false,
        error: action.payload,
      };
    case FollowActionType.TOGGLE_FOLLOW_REQUEST:
      return {
        ...state,
        toggleStatus: "",
        loading: true,
        error: null,
      };
    case FollowActionType.TOGGLE_FOLLOW_SUCCESS:
      return {
        ...state,
        toggleStatus: action.payload,
        loading: false,
        error: null,
      };
    case FollowActionType.TOGGLE_FOLLOW_FAILURE:
      return {
        ...state,
        toggleStatus: "",
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default followReducer;
