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

const editCreativeRequest = (): CreativeAction => ({
  type: CreativeActionType.UPDATE_CREATIVE_REQUEST,
  loading: true,
  error: null,
});

const editCreativeSuccess = (payload: Creative): CreativeAction => ({
  type: CreativeActionType.UPDATE_CREATIVE_SUCCESS,
  payload: payload,
  loading: false,
  error: null,
});

const editCreativeFailure = (error: string): CreativeAction => ({
  type: CreativeActionType.UPDATE_CREATIVE_FAILURE,
  loading: false,
  error: error,
});

export const getMe = (username: string) => {
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

export const editMe = (
  id: number,
  token: string,
  creative: {
    username: string | null;
    password: string | null;
    firstname: string | null;
    lastname: string | null;
    stageName: string | null;
    bio: string | null;
    city: string | null;
    state: string | null;
    image: File | null;
    skills: string[] | null;
    professions: string[] | null;
  }
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(editCreativeRequest());
    try {
      const formData = new FormData();
      formData.append("username", creative.username || "");
      formData.append("password", creative.password || "");
      formData.append("firstname", creative.firstname || "");
      formData.append("lastname", creative.lastname || "");
      formData.append("stageName", creative.stageName || "");
      formData.append("bio", creative.bio || "");
      formData.append("city", creative.city || "");
      formData.append("state", creative.state || "");
      if (creative.image) {
        formData.append("image", creative.image);
      }
      if (creative.skills) {
        creative.skills.forEach((skill) => formData.append("skills", skill));
      }
      if (creative.professions) {
        creative.professions.forEach((profession) =>
          formData.append("professions", profession)
        );
      }

      const response = await fetch(
        `http://localhost:8080/api/creatives/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(editCreativeSuccess(data));
        return data;
      } else {
        throw new Error("Failed to edit creative");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(editCreativeFailure(error.message));
      } else {
        dispatch(
          editCreativeFailure(
            "An unknown error occurred while editing the creative."
          )
        );
      }
    }
  };
};
