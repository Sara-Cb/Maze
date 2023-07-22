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

const getMeRequest = (): CreativeAction => ({
  type: CreativeActionType.GET_ME_REQUEST,
  loading: true,
  error: null,
});

const getMeSuccess = (payload: Creative): CreativeAction => ({
  type: CreativeActionType.GET_ME_SUCCESS,
  payload: payload,
  loading: false,
  error: null,
});

const getMeFailure = (error: string): CreativeAction => ({
  type: CreativeActionType.GET_ME_FAILURE,
  loading: false,
  error: error,
});

const editMeRequest = (): CreativeAction => ({
  type: CreativeActionType.UPDATE_ME_REQUEST,
  loading: true,
  error: null,
});

const editMeSuccess = (payload: Creative): CreativeAction => ({
  type: CreativeActionType.UPDATE_ME_SUCCESS,
  payload: payload,
  loading: false,
  error: null,
});

const editMeFailure = (error: string): CreativeAction => ({
  type: CreativeActionType.UPDATE_ME_FAILURE,
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

export const getMe = (username: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getMeRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/creatives/${username}`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(getMeSuccess(data));
      } else {
        throw new Error("Failed reading me");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(getMeFailure(error.message));
      } else {
        dispatch(getMeFailure("An unknown error occurred reading me."));
      }
    }
  };
};

export const editMe = (
  id: number,
  token: string,
  me: {
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
    dispatch(editMeRequest());
    try {
      const formData = new FormData();
      formData.append("username", me.username || "");
      formData.append("password", me.password || "");
      formData.append("firstname", me.firstname || "");
      formData.append("lastname", me.lastname || "");
      formData.append("stageName", me.stageName || "");
      formData.append("bio", me.bio || "");
      formData.append("city", me.city || "");
      formData.append("state", me.state || "");
      if (me.image) {
        formData.append("image", me.image);
      }
      if (me.skills) {
        me.skills.forEach((skill) => formData.append("skills", skill));
      }
      if (me.professions) {
        me.professions.forEach((profession) =>
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
        dispatch(editMeSuccess(data));
        return data;
      } else {
        throw new Error("Failed to edit me");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(editMeFailure(error.message));
      } else {
        dispatch(
          editMeFailure("An unknown error occurred while editing the me.")
        );
      }
    }
  };
};
