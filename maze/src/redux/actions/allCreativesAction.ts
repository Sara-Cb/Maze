import { Dispatch } from "redux";
import {
  CreativeActionType,
  CreativeAction,
  Creative,
} from "../../types/creativeType";
import { AnyAction } from "@reduxjs/toolkit";

const getAllCreativesRequest = (): CreativeAction => ({
  type: CreativeActionType.GET_ALL_CREATIVES_REQUEST,
  loading: true,
  error: null,
});

const getAllCreativesSuccess = (payload: Creative): CreativeAction => ({
  type: CreativeActionType.GET_ALL_CREATIVES_SUCCESS,
  payload: payload,
  loading: false,
  error: null,
});

const getAllCreativesFailure = (error: string): CreativeAction => ({
  type: CreativeActionType.GET_ALL_CREATIVES_FAILURE,
  loading: false,
  error: error,
});

export const getAllCreatives = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getAllCreativesRequest());
    try {
      const response = await fetch(
        "http://localhost:8080/api/creatives/search?sort=stageName,ASC"
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(getAllCreativesSuccess(data.content));
      } else {
        throw new Error("Failed reading creative");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(getAllCreativesFailure(error.message));
      } else {
        dispatch(
          getAllCreativesFailure("An unknown error occurred reading creative.")
        );
      }
    }
  };
};
