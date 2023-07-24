import { FollowActionType, FollowAction } from "../../types/followType";
import { Dispatch } from "redux";
import { AnyAction } from "@reduxjs/toolkit";
import { Creative } from "../../types/creativeType";

const getMyFollowsRequest = (): FollowAction => ({
  type: FollowActionType.GET_MY_FOLLOWED_REQUEST,
  loading: true,
  error: null,
});

const getMyFollowsSuccess = (followed: Creative[]): FollowAction => ({
  type: FollowActionType.GET_MY_FOLLOWED_SUCCESS,
  loading: false,
  payload: followed,
});

const getMyFollowsFailure = (error: string): FollowAction => ({
  type: FollowActionType.GET_MY_FOLLOWED_FAILURE,
  loading: false,
  error: error,
});
const isFollowedRequest = (): FollowAction => ({
  type: FollowActionType.IS_PROFILE_FOLLOWED_REQUEST,
  loading: true,
  error: null,
});

const isFollowedSuccess = (follow: boolean): FollowAction => ({
  type: FollowActionType.IS_PROFILE_FOLLOWED_SUCCESS,
  loading: false,
  payload: follow,
});

const isFollowedFailure = (error: string): FollowAction => ({
  type: FollowActionType.IS_PROFILE_FOLLOWED_FAILURE,
  loading: false,
  error: error,
});

const toggleFollowRequest = (): FollowAction => ({
  type: FollowActionType.TOGGLE_FOLLOW_REQUEST,
  loading: true,
  error: null,
});

const toggleFollowSuccess = (message: string): FollowAction => ({
  type: FollowActionType.TOGGLE_FOLLOW_SUCCESS,
  loading: false,
  payload: message,
});

const toggleFollowFailure = (error: string): FollowAction => ({
  type: FollowActionType.TOGGLE_FOLLOW_FAILURE,
  loading: false,
  error: error,
});

export const getFollowedList = (token: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getMyFollowsRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/creatives/follow`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(getMyFollowsSuccess(data));
        console.log(data);
        return data;
      } else {
        throw new Error("Failed to get follow");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(getMyFollowsFailure(error.message));
      } else {
        dispatch(
          getMyFollowsFailure(
            "An unknown error occurred while getting the follow."
          )
        );
      }
    }
  };
};

export const isCreativeFollowed = (token: string, username: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(isFollowedRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/creatives/follow/${username}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(isFollowedSuccess(data));
        return data;
      } else {
        throw new Error("Failed to get follow");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(isFollowedFailure(error.message));
      } else {
        dispatch(
          isFollowedFailure(
            "An unknown error occurred while getting the follow."
          )
        );
      }
    }
  };
};

export const toggleFollowCreative = (token: string, username: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(toggleFollowRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/creatives/toggle-follow/${username}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(toggleFollowSuccess(data));
        getFollowedList(token);
        return data;
      } else {
        throw new Error("Failed to post follow");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(toggleFollowFailure(error.message));
      } else {
        dispatch(
          toggleFollowFailure(
            "An unknown error occurred while posting the follow."
          )
        );
      }
    }
  };
};
