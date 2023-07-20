import { Dispatch } from "redux";
import {
  CreativeActionType,
  CreativeAction,
  Creative,
} from "../../types/creativeType";
import { AnyAction } from "@reduxjs/toolkit";

const getCreativeRequest = (): CreativeAction => ({
  type: CreativeActionType.GET_CREATIVE_REQUEST,
  loading: true,
  error: null,
});

const getCreativeSuccess = (payload: Creative): CreativeAction => ({
  type: CreativeActionType.GET_CREATIVE_SUCCESS,
  payload: payload,
  loading: false,
  error: null,
});

const getCreativeFailure = (error: string): CreativeAction => ({
  type: CreativeActionType.GET_CREATIVE_FAILURE,
  loading: false,
  error: error,
});

export const getCreative = (username: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getCreativeRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/creatives/${username}`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(getCreativeSuccess(data));
      } else {
        throw new Error("Failed reading creative");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(getCreativeFailure(error.message));
      } else {
        dispatch(
          getCreativeFailure("An unknown error occurred reading creative.")
        );
      }
    }
  };
};
