import { Creative } from "./creativeType";
//import { Project } from "./projectType";

export enum FollowActionType {
  GET_MY_FOLLOWED_REQUEST = "GET_MY_FOLLOWED_REQUEST",
  GET_MY_FOLLOWED_SUCCESS = "GET_MY_FOLLOWED_SUCCESS",
  GET_MY_FOLLOWED_FAILURE = "GET_MY_FOLLOWED_FAILURE",
  IS_PROFILE_FOLLOWED_REQUEST = "IS_PROFILE_FOLLOWED_REQUEST",
  IS_PROFILE_FOLLOWED_SUCCESS = "IS_PROFILE_FOLLOWED_SUCCESS",
  IS_PROFILE_FOLLOWED_FAILURE = "IS_PROFILE_FOLLOWED_FAILURE",
  TOGGLE_FOLLOW_REQUEST = "TOGGLE_FOLLOW_REQUEST",
  TOGGLE_FOLLOW_SUCCESS = "TOGGLE_FOLLOW_SUCCESS",
  TOGGLE_FOLLOW_FAILURE = "TOGGLE_FOLLOW_FAILURE",
}

export interface FollowAction {
  type: FollowActionType;
  payload?: any;
  loading: boolean;
  error?: string | null;
}

export interface FollowState {
  myFollowList: Creative[];
  isProfileFollowed: boolean;
  toggleStatus: string;
  loading: boolean;
  error?: string | null;
}
