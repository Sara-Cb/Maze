import {
  ElaborateActionType,
  ElaborateAction,
  Elaborate,
} from "./../types/elaborateType";
import { Dispatch } from "redux";
import { AnyAction } from "@reduxjs/toolkit";

const getElaborateRequest = (): ElaborateAction => ({
  type: ElaborateActionType.GET_ELABORATE_REQUEST,
  loading: true,
  error: null,
});

const getElaborateSuccess = (elaborate: Elaborate): ElaborateAction => ({
  type: ElaborateActionType.GET_ELABORATE_SUCCESS,
  loading: false,
  payload: elaborate,
});

const getElaborateFailure = (error: string): ElaborateAction => ({
  type: ElaborateActionType.GET_ELABORATE_FAILURE,
  loading: false,
  error: error,
});

const postElaborateRequest = (): ElaborateAction => ({
  type: ElaborateActionType.POST_ELABORATE_REQUEST,
  loading: true,
  error: null,
});

const postElaborateSuccess = (elaborate: Elaborate): ElaborateAction => ({
  type: ElaborateActionType.POST_ELABORATE_SUCCESS,
  loading: false,
  payload: elaborate,
});

const postElaborateFailure = (error: string): ElaborateAction => ({
  type: ElaborateActionType.POST_ELABORATE_FAILURE,
  loading: false,
  error: error,
});

const editElaborateRequest = (): ElaborateAction => ({
  type: ElaborateActionType.UPDATE_ELABORATE_REQUEST,
  loading: true,
  error: null,
});

const editElaborateSuccess = (elaborate: Elaborate): ElaborateAction => ({
  type: ElaborateActionType.UPDATE_ELABORATE_SUCCESS,
  loading: false,
  payload: elaborate,
});

const editElaborateFailure = (error: string): ElaborateAction => ({
  type: ElaborateActionType.UPDATE_ELABORATE_FAILURE,
  loading: false,
  error: error,
});

const deleteElaborateRequest = (): ElaborateAction => ({
  type: ElaborateActionType.DELETE_ELABORATE_REQUEST,
  loading: true,
});

const deleteElaborateSuccess = (): ElaborateAction => ({
  type: ElaborateActionType.DELETE_ELABORATE_SUCCESS,
  loading: false,
});

const deleteElaborateFailure = (error: string): ElaborateAction => ({
  type: ElaborateActionType.DELETE_ELABORATE_FAILURE,
  loading: false,
  error: error,
});

export const getElaborate = (id: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getElaborateRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/elaborates/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(getElaborateSuccess(data));
        return data;
      } else {
        throw new Error("Failed to get elaborate");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(getElaborateFailure(error.message));
      } else {
        dispatch(
          getElaborateFailure(
            "An unknown error occurred while getting the elaborate."
          )
        );
      }
    }
  };
};

export const createElaborate = (token: string, elaborate: Elaborate) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(postElaborateRequest());
    try {
      const formData = new FormData();
      formData.append("file", elaborate.file);
      formData.append("title", elaborate.title);
      formData.append("description", elaborate.description || "");
      if (elaborate.collection) {
        formData.append("collectionId", elaborate.collection.toString());
      }

      const response = await fetch("http://localhost:8080/api/elaborates", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(postElaborateSuccess(data));
        return data;
      } else {
        throw new Error("Failed to post elaborate");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(postElaborateFailure(error.message));
      } else {
        dispatch(
          postElaborateFailure(
            "An unknown error occurred while posting the elaborate."
          )
        );
      }
    }
  };
};

export const editElaborate = (
  token: string,
  id: string,
  elaborate: Elaborate
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(editElaborateRequest());
    try {
      const formData = new FormData();
      if (elaborate.file) {
        formData.append("file", elaborate.file);
      }
      formData.append("title", elaborate.title);
      formData.append("description", elaborate.description || "");
      if (elaborate.collection) {
        formData.append("collectionId", elaborate.collection.toString());
      }

      const response = await fetch(
        `http://localhost:8080/api/elaborates/${id}`,
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
        dispatch(editElaborateSuccess(data));
        return data;
      } else {
        throw new Error("Failed to edit elaborate");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(editElaborateFailure(error.message));
      } else {
        dispatch(
          editElaborateFailure(
            "An unknown error occurred while editing the elaborate."
          )
        );
      }
    }
  };
};

export const deleteElaborate = (id: string, token: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(deleteElaborateRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/elaborates/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        dispatch(deleteElaborateSuccess());
        return console.log("elaborate deleted successfully");
      } else {
        throw new Error("Failed reading elaborate");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(deleteElaborateFailure(error.message));
      } else {
        dispatch(
          deleteElaborateFailure(
            "An unknown error occurred while deleting the elaborate."
          )
        );
      }
    }
  };
};
